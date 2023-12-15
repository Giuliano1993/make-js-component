import inquirer from "inquirer";
import { prepareAdvanced } from "../../utils.mjs";
const framework = "vue";
export default function (componentName, folder) {
    return inquirer
        .prompt([
        {
            type: "list",
            name: "api",
            message: "Choose wich api to use",
            choices: ["Composition", "Options"],
        },
        ...prepareAdvanced(["props", "refs", "data", "mounted", "emits", "components"]),
    ])
        .then((answers) => {
        return {
            componentName: componentName,
            framework: framework,
            template: answers.api === "Composition" ? "component-composition.vue" : "component-options.vue",
            folder: folder,
            advanced: answers.advanced,
            api: answers.api.toLocaleLowerCase(),
            advancedOpts: answers.advancedOpts || [],
        };
    });
}
