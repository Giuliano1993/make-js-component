#! /usr/bin/env node


//const wizard = require('../utils/wizard.mjs');
import wizard from "../utils/wizard.mjs";
import createComponent from "../src/utils/utils.mjs";

type Answers = {
    componentName: string,
    framework: string,
    template : string,
    folder ?: string
}

wizard().then((answers: Answers)=>{
    const {componentName, framework, template, folder} = answers;
    
    createComponent(componentName, framework, template, folder)
})