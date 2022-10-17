import { domainmodels, projects, IModel, security, IStructure } from "mendixmodelsdk";


export function findOrCreateModuleAndFolder(model: IModel, domainModelName: string, moduleName: string, folderName: string): projects.IFolder {
    let module = model.allModules().filter(mod => mod.name === moduleName)[0];
    if (module == null) {
        const modelProject: projects.IProject = model.allProjects()[0];
        let newmodule = projects.Module.createIn(modelProject);
        const moduleSecurity = security.ModuleSecurity.createIn(newmodule);
        const domainModel = domainmodels.DomainModel.createIn(newmodule);
        let domainModelFolder = projects.Folder.createIn(newmodule);
        let folder = projects.Folder.createIn(domainModelFolder);
        domainModelFolder.name = domainModelName;
        folder.name = folderName;
        newmodule.name = moduleName;
        return folder;
    } else {
        const existingDMFolder = module.folders.filter(folder => folder.name === domainModelName)[0];
        if (existingDMFolder == null) {
            let domainModelFolder = projects.Folder.createIn(module);
            let folder = projects.Folder.createIn(domainModelFolder);
            domainModelFolder.name = domainModelName;
            folder.name = folderName;
            return folder
        } else {
            const existingfolder = existingDMFolder.folders.filter(folder => folder.name === folderName)[0];
            if (existingfolder == null) {
                let newfolder = projects.Folder.createIn(existingDMFolder);
                newfolder.name = folderName;
                return newfolder;
            } else {
                return existingfolder;
            }
        }
    }
}

export function MicroflowExists(model: IModel, moduleName: string, microflowName: string, folder: projects.IFolder): boolean {
    let module = model.allModules().filter(mod => mod.name === moduleName)[0];
    if (module == null) {
        return false;
    } else {
        return model.allMicroflows()
            .filter(mf => mf.qualifiedName == (moduleName + "." + microflowName) /* && mf.containerAsFolderBase == folder */)[0] != null;
    }
}

// https://github.com/simo101/Mendix-Count-Application-Objects/blob/master/script.ts
export function getModule(element: IStructure): projects.Module | null {
    let current = element.unit;
    while (current) {
        if (current instanceof projects.Module) {
            return current;
        }
        current = current.container;
    }
    return null;
}

