#! /usr/bin/env node
import createComponent from "../src/utils/utils.mjs";
import wizard from "../src/utils/wizard.mjs";
var vueApi;
(function (vueApi) {
    vueApi["Composition"] = "composition";
    vueApi["Option"] = "option";
})(vueApi || (vueApi = {}));
wizard()
    .then((answers) => {
    const { componentName, framework, template, folder, advancedOpts, advanced } = answers;
    const api = template.indexOf("composition") !== -1 ? vueApi.Composition : vueApi.Option;
    const t = advanced ? "advanced-component.vue" : template;
    createComponent(componentName, framework, t, folder, api, advancedOpts);
})
    .catch((e) => {
    console.error(e.message);
});
