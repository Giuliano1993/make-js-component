import inquirer from "inquirer";
import { prepareAdvanced } from "../../src/utils/utils.mjs";

const framework = "vue";
export default function(componentName:string, folder:string){
    return inquirer.prompt([{
        type: "list",
        name: "api",
        message: "Choose wich api to use",
        choices: ["Composition API", "Options API"],
      },
      ...prepareAdvanced(['state','robe'])
    ])
    .then((answers: { 
      api: string,
      advanced: boolean,
      advancedOpts?: string[]
    }) => {
      return {
        componentName: componentName,
        framework: framework,
        template:
          answers.api === "Composition API"
            ? "component-composition.vue"
            : "component-options.vue",
        folder: folder,
        advanced : answers.advanced,
        advancedOpts : answers.advancedOpts || []
      };
    });
}


