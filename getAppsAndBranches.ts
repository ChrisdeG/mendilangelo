import axios from 'axios';
import inquirer from 'inquirer'
import { IModel } from "mendixmodelsdk";

// interfaces for processing rest requests

interface App {
    AppId: string;
    Name: string;
    Url: string;
    ProjectId: string;
}

interface BranchItem {
    name: string,
    latestCommit: {
        date: Date,
        message: string,
        mendixVersion: string
    }
}

interface Branch {
    items: BranchItem[]
}

export async function getBranches(appId: string): Promise<Branch> {
    let res = await axios.get(`https://repository.api.mendix.com/v1/repositories/${appId}/branches`, {
        'headers': {
            'Authorization': 'MxToken ' + process.env.MENDIX_TOKEN
        }
    })
    if (res && res.data) {
        return res.data;
    } else {
        // trunk is always available
        return ({ items: [{ name: 'trunk', latestCommit: { date: new Date(), message: '', mendixVersion: '' } }] });
    }
}

export async function getApps(): Promise<App[]> {
    let request = await axios.get('https://deploy.mendix.com/api/1/apps', {
        'headers': {
            'Mendix-ApiKey': process.env.MENDIX_API_KEY,
            'Mendix-Username': process.env.MENDIX_API_USER
        }
    })
    return request.data;
}
/*
    Check whether the environment constants are filled in
    open the Mendix pages for instructions.
*/

export function keysAndTokensOk() {
    let result = true;
    if (process.env.MENDIX_API_KEY == null || process.env.MENDIX_API_USER == null) {
        console.warn("Please setup your api key, environment variables (MENDIX_API_KEY, MENDIX_API_USER)");
        open('https://docs.mendix.com/apidocs-mxsdk/apidocs/authentication/');
        result = false;
    }
    if (process.env.MENDIX_TOKEN == null) {
        console.warn("Please setup your Mendix personal access token");
        open('https://docs.mendix.com/apidocs-mxsdk/mxsdk/setup-your-pat/');
        result = false;
    }
    return result;
}
export async function askApp() {
    let apps = await getApps();
    // create a list of app names
    const choices = apps.map(app => app.Name);
    // setup the question
    const question = [{
        type: 'list',
        name: 'app',
        message: 'For which project do you want to create microflows?',
        choices: choices
    }];
    // ask for project
    let response = await inquirer.prompt(question);
    // get the project id by name
    let projectId = apps.filter(app => app.Name == response.app)[0].ProjectId;
    return projectId;
}

/*
 * If there are multiple branches, ask which branch
 */

export async function askBranch(projectId: string) {
    const branches = await getBranches(projectId)
    let branch = 'trunk';
    if (branches.items.length > 1) {
        const branchchoices = branches.items.map(item => item.name);
        // setup the question
        const questionbranch = [{
            type: 'list',
            name: 'branch',
            message: 'For which branch?',
            choices: branchchoices
        }];
        let response = await inquirer.prompt(questionbranch);
        branch = response.branch;
    }
    return branch;
}

/*
 * Ask for which module
 */
 
export async function askModule(model: IModel, targetModule: string) {
    const questionmodels = [{
        type: 'list',
        name: 'name',
        message: 'For which module?',
        choices: model.allDomainModels()
            .filter(module => module.containerAsModule.name != targetModule)
            .map(module => module.containerAsModule.name)
            .sort()
    }];
    const moduleresponse = await inquirer.prompt(questionmodels);
    return moduleresponse;
}

