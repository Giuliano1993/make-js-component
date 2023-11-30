import inquirer from 'inquirer';
import { Answers } from '../../../types/index.mjs';

const framework = "vue";

const COMPOSITION_API = "Composition API";
const ALT_COMPOSITION_API = "composition";
const OPTIONS_API = "Options API";
const ALT_OPTIONS_API = "options";

const VueCompositionApiOptions: string[] = [COMPOSITION_API, ALT_COMPOSITION_API];
const VueOptionsApiOptions: string[] = [OPTIONS_API, ALT_OPTIONS_API];

const VueComponentTypeOptions: string[] = [COMPOSITION_API, OPTIONS_API];

const AllVueComponentTypeOptions: string[] = [...VueCompositionApiOptions, ...VueOptionsApiOptions];

const getComponentTemplate = (template: string): string => {
    return VueCompositionApiOptions.includes(template) ? "component-composition.vue" : "component-options.vue";
};

const isValidTemplate = (template: string): boolean => {
  return AllVueComponentTypeOptions.includes(template);
}

const vueWirzard = (componentName: string, folder: string, template?: string): Answers | PromiseLike<Answers> => {
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
  .then((answers: { api: string }) => {
    return {
      componentName,
      framework,
      folder,
      template: getComponentTemplate(answers.api),
    };
  });
};

export default vueWirzard;