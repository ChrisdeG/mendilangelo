/*
    Export all microflows to a folder in the current structure
*/
import { JavaScriptSerializer, microflows } from "mendixmodelsdk";
import { MendixPlatformClient } from "mendixplatformsdk";
import { askApp, askBranch, keysAndTokensOk } from './getAppsAndBranches'
import { getModule } from "./findOrCreateModuleAndFolder";
import * as fs from 'fs';



async function main() {
    console.info("Export microflows to typescript - v 0.2 (c) Chris de Gelder / Low code connect 2022")
    // check the environment variables and token
    if (!keysAndTokensOk())
        return;
    const client = new MendixPlatformClient();
    // ask for which app
    let projectId = await askApp();
    // for which branch (if more than one)
    let branch = await askBranch(projectId);
    // open the app
    const app = client.getApp(projectId);
    // create a working copy online
    const workingCopy = await app.createTemporaryWorkingCopy(branch);
    // open the model
    const model = await workingCopy.openModel();
    let dir = "./MicroflowGenerators";
    // force directory
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    model.allMicroflows().forEach(async mf => {
        const microflow = await mf.load();
        let module = 'others'
        try {
            const md = getModule(mf)
            if (md) {
                module = md.name
            }
        } catch (err) {
            console.log(err)
        }
        let tsContents = JavaScriptSerializer.serializeToJs(microflow);
        tsContents = processJavascriptCode(tsContents, mf);
        const filename = `${dir}/${module}_${mf.name}.ts`;
        console.log('Writing ', filename)
        fs.writeFile(filename,
            tsContents, err => {
                if (err) {
                    console.error(err);
                }
            });
    })
    /*
        adapt the javascript to make it typescript and add paramter.s
    */

    function processJavascriptCode(tsContents: string, mf: microflows.IMicroflow) {
        tsContents = tsContents.replace('(function (unit, model) {', '');
        tsContents = tsContents.trim().slice(0, -1); // remove )
        // add default header for Mendilangelo
        tsContents =
            'import { domainmodels, microflows, datatypes, texts, IModel, expressions } from "mendixmodelsdk";\n' +
            'import { findOrCreateModuleAndFolder, MicroflowExists } from "./findOrCreateModuleAndFolder";\n' +

            `export function generate_${mf.name}(model: IModel, domainModel: domainmodels.DomainModel, entityName: string,  targetModule: string) {\n` +
            `    const unit = findOrCreateModuleAndFolder(model, domainModel.containerAsModule.name, targetModule, entityName);`
            + tsContents;
        let unsupported = false
        let lines = tsContents.split('\n');
        for (var i = 0; i < lines.length; i++) {
            // previous line was unsupported. Add an un-cast for typescript.
            if (unsupported) {
                lines[i] = '\t(' + lines[i].trimStart().replace('\.__', ' as any).__')
                unsupported = false;
            }
            unsupported = lines[i].includes('this is an unsupported internal property of the Model SDK')
        }

        return lines.join('\r\n');
    }
    // don't commit the model
}

main().catch(console.error);



