#! /usr/bin/env node
import createComponent, { createAnotherComponent, } from "../src/utils/utils.mjs";
import wizard from "../src/utils/wizard.mjs";
var vueApi;
(function (vueApi) {
  vueApi["Composition"] = "composition";
  vueApi["Option"] = "option";
})(vueApi || (vueApi = {}));
wizard()
    .then((answers) => {
    const { componentName, 
           framework, 
           template, 
           folder, 
           anotherComponent, 
           advancedOpts, 
           advanced, 
          } = answers;
    const api = 
          template.indexOf("composition") !== -1
        ? vueApi.Composition
        : vueApi.Option;
    const t = advanced ? "advanced-component.vue" : template;
    if (anotherComponent) {
        createComponent(componentName, framework, t, folder, api, advancedOpts).then(() => {
            console.log("✅ Component created");
            createAnotherComponent();
        });
    }
    else
        createComponent(componentName, framework, t, folder, api, advancedOpts).then(() => console.log("✅ Component created"));
})
    .catch((e) => {
    console.error(e.message);
  });
