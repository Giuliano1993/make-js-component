import inquirer from 'inquirer';
const framework = "vue";
const COMPOSITION_API = "Composition API";
const ALT_COMPOSITION_API = "composition";
const OPTIONS_API = "Options API";
const ALT_OPTIONS_API = "options";
const VueCompositionApiOptions = [COMPOSITION_API, ALT_COMPOSITION_API];
const VueOptionsApiOptions = [OPTIONS_API, ALT_OPTIONS_API];
const VueComponentTypeOptions = [COMPOSITION_API, OPTIONS_API];
const AllVueComponentTypeOptions = [...VueCompositionApiOptions, ...VueOptionsApiOptions];
const getComponentTemplate = (template) => {
    return VueCompositionApiOptions.includes(template) ? "component-composition.vue" : "component-options.vue";
};
const isValidTemplate = (template) => {
    return AllVueComponentTypeOptions.includes(template);
};
const vueWirzard = (componentName, folder, template) => {
    if (template && isValidTemplate(template)) {
        return {
            componentName,
            framework,
            folder,
            template: getComponentTemplate(template),
        };
    }
    return inquirer.prompt([{
            type: "list",
            name: "api",
            message: "Choose wich api to use",
            choices: VueComponentTypeOptions,
        },
    ])
        .then((answers) => {
        return {
            componentName,
            framework,
            folder,
            template: getComponentTemplate(answers.api),
        };
    });
};
export default vueWirzard;
