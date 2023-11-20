import inquirer from "inquirer";

const vueWizard = async (componentName) =>{
    const framework = 'vue';
    return inquirer.prompt([{
        type: "list",
        name: "api",
        message: "choose wich api to use",
        choices: ["Composition API", "Options API"]
    },
    {
        type:"input",
        name:"folder",
        message: "Component subdirectory [Default to compoenents folder]",
        default: ""
    }]).then((answers)=>{
        const template = answers.api === "Composition API" ? "component-composition.vue" : "component-options.vue";
        const folder = answers.folder
        return {
            componentName: componentName,
            framework: framework,
            template: template,
            folder
        }
    })
}

export default vueWizard