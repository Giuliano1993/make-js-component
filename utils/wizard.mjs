import inquirer from 'inquirer';

const wizard = async()=>{

    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "give a name to your component"
        },
        {
            type: "list",
            name: "framework",
            message: "pick a framework to create the component for",
            choices: ["vue","angular"]
        }
    ]).then((answers)=>{
        const componentName = answers.name;
        const framework = answers.framework;
        if(framework === 'vue'){
            return inquirer.prompt([{
                type: "list",
                name: "api",
                message: "choose wich api to use",
                choices: ["Composition API", "Options API"]
            },{
                type: 'input',
                name: 'folder',
                message: "custom path under the component folder for saving your component",
                default: ""
            }]).then((answers)=>{
                return {
                    componentName: componentName,
                    framework: framework,
                    template: answers.api === "Composition API" ? "component-composition.vue" : "component-options.vue",
                    folder: answers.folder
                }
            })
        }else if(framework === 'angular'){
            return inquirer.prompt([{
                type: 'input',
                name: 'folder',
                message: "custom path under the component folder for saving your component",
                default: ""
            }]).then((answers)=>{
                return {
                    componentName: componentName,
                    framework: framework,
                    template: "component.component.js",
                    folder: answers.folder
                }
            })
        }
        else{
            return new Promise((resolve,reject)=>{
                resolve({
                    componentName: componentName,
                    framework:framework
                })
            })
        }
    
    
    }).then((values)=>{
        return values
    })
}
export default wizard;