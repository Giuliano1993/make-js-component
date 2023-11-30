#! /usr/bin/env node
import wizard from "../utils/wizard/wizard.mjs";
import createComponent from "../src/utils/utils.mjs";
wizard().then((answers) => {
    const { componentName, framework, template, folder } = answers;
    createComponent(componentName, framework, template, folder);
}).catch((e) => {
    console.error(e.message);
});
