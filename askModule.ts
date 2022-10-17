import { IModel } from "mendixmodelsdk";
import inquirer from 'inquirer';



export async function askModule(model: IModel, targetModule: string) {
    const questionmodels = [{
        type: 'list',
        name: 'name',
        message: 'For which module?',
        choices: model.allDomainModels()
            .filter(module => module.containerAsModule.name != targetModule)
            .map(module => module.containerAsModule.name)
    }];
    const moduleresponse = await inquirer.prompt(questionmodels);
    return moduleresponse;
}
