import inquirer from 'inquirer';


export default function(){

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "give a name to your component"
        },
        {
            type: "list",
            name: "framework",
            message: "pick a framework to create the component for",
            choices: ["vue","react"]
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
            }]).then((answers)=>{
                return {
                    componentName: componentName,
                    framework: framework,
                    api: answers.api
                }
            })
        }else{
            return new Promise((resolve,reject)=>{
                resolve({
                    componentName: componentName,
                    framework:framework
                })
            })
        }
    
    
    }).then((values)=>{
        console.log(values)
    })
}
