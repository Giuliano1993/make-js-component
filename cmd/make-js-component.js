#! /usr/bin/env node

import inquirer from 'inquirer';
import createComponent from '../src/utils/utils.js';
import vueWizard from '../src/programs/vue.js';

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
        choices: ["vue","angular"]
    }
]).then((answers)=>{
    const componentName = answers.name;
    const framework = answers.framework;
    if(framework === 'vue'){
        vueWizard(componentName).then((answers)=>{
            console.log(...Object.values(answers))
            
            createComponent(...Object.values(answers))
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