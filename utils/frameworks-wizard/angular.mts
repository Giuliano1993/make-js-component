import inquirer from "inquirer";

const framework = "angular";


export default function(componentName: string, folder:string){
    return {
        componentName: componentName,
        framework: framework.toLowerCase(),
        template: "component.component.ts",
        folder: folder,
      };
}