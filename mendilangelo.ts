/*
    Create microflows for Validation, FindOrCreate, DeleteAll, Save (Validate & Close) 
*/
//import { domainmodels, Model, JavaScriptSerializer, AbstractModel } from "mendixmodelsdk";
//import IDomainModel = domainmodels.IDomainModel;
import { MendixPlatformClient } from "mendixplatformsdk"; 
import { generateSaveMFEntity } from "./generateSaveMFEntity";
import { generateDeleteAllForEntity } from "./generateDeleteAllForEntity";
import { generateFindOrCreateForEntity } from "./generateFindOrCreateForEntity";
import { generateValidationMicroflowForEntity } from "./generateValidationMicroflowForEntity";
import { askApp, askBranch, keysAndTokensOk, askModule} from './getAppsAndBranches'


async function main() {
    console.info("Mendilangelo - Mendix code generator - v 0.1 (c) Chris de Gelder / Low code connect 2022")
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
    // name the target module
    const targetModule = 'Mendilangelo';
    // ask for which module 
    const moduleresponse = await askModule(model, targetModule);
    // get the selected domeinmodel
    const domainModelInterface = model.allDomainModels().filter(dm => dm.containerAsModule.name === moduleresponse.name)[0];
    // load the data from the domainmodel interface
    const domainModel = await domainModelInterface.load();
    // generate for all entities
    domainModel.entities.forEach(entity => {
        generateValidationMicroflowForEntity(model, domainModel, entity.name, targetModule);
        generateFindOrCreateForEntity(model, domainModel, entity.name, targetModule);
        generateDeleteAllForEntity(model, domainModel, entity.name, targetModule);
        generateSaveMFEntity(model, domainModel, entity.name, targetModule);
    });
    await model.flushChanges();
    // TODO Opton to Export MPK instead of commit.
    // let module = model.allModules().filter(mod => mod.name === targetModule)[0];
    // await model.exportModuleMpk(module.id, 'out.mpk')
    // in case of svn "trunk", git "main" otherwise branch name
    await workingCopy.commitToRepository(branch);
}

main().catch(console.error);



