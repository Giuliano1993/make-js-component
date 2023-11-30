#! /usr/bin/env node


import wizard from "../utils/wizard/wizard.mjs";
import createComponent from "../src/utils/utils.mjs";
import { Answers } from "../types/index.mjs";

wizard().then((answers: Answers)=>{
    const {componentName, framework, template, folder} = answers;
    
    createComponent(componentName, framework, template, folder)
}).catch((e:Error)=>{
    console.error(e.message)
})