import inquirer from 'inquirer';


type Answers = {
    componentName: string,
    framework: string,
    template: string,
    folder: string
}
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
    ]).then((answers: {
        name: string,
        framework: string
    })=>{
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
            }]).then((answers: {
                api: string,
                folder: string
            })=>{
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
            }]).then((answers: {
                folder:string
            })=>{
                return {
                    componentName: componentName,
                    framework: framework,
                    template: "component.component.js",
                    folder: answers.folder
                }
            })
        }else{
            throw new Error("a framework must be selected");
        }
    
    
    }).then<Answers>((values : Answers|PromiseLike<Answers>)=>{
        return values
    }).catch((e:Error)=>{
        throw new Error(e.message);
    })
    
}
export default wizard;