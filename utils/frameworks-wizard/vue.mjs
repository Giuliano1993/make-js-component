import inquirer from "inquirer";
const framework = "vue";
export default function (componentName, folder) {
    return inquirer.prompt([{
            type: "list",
            name: "api",
            message: "Choose wich api to use",
            choices: ["Composition API", "Options API"],
        },
    ])
        .then((answers) => {
        return {
            componentName: componentName,
            framework: framework,
            template: answers.api === "Composition API"
                ? "component-composition.vue"
                : "component-options.vue",
            folder: folder,
        };
    });
}
