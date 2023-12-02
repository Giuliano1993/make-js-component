import inquirer from 'inquirer';
import { Command } from 'commander';
import { capitalizeFirstLetter } from '../src/utils/utils.mjs';
import vueWizard from './frameworks-wizard/vue.mjs';
import angularWizard from './frameworks-wizard/angular.mjs';
import reactWizard from './frameworks-wizard/react.mjs';
import svelteWizard from './frameworks-wizard/svelte.mjs';
import qwikWizard from './frameworks-wizard/qwik.mjs';

const program = new Command();

type Answers = {
    componentName: string,
    framework: string,
    template: string,
    folder: string
};

const wizard = async () => {
    // Parse command line arguments using commander
    program
        .option('--name <value>', 'Specify a name')
        .option('-f, --framework <value>', 'Specify framework (Vue, Angular, React, Svelte, Qwik)')
        .parse(process.argv);

    const options = program.opts();
    const componentNameFromFlag = options.name || '';
    const frameworkFromFlag = options.framework || '';

    const prompts = [];

    // Only ask for componentName if --name argument is not provided
    if (!componentNameFromFlag) {
        prompts.push({
            type: 'input',
            name: 'componentName',
            message: 'Give a name to your component',
            validate: (input: string) => {
                const trimmedInput = input.trim();
                if (trimmedInput === '') {
                    return 'Component name cannot be empty';
                }
                // Use a regular expression to check for only alphanumeric characters
                const isValid = /^[a-zA-Z0-9]+$/.test(trimmedInput);
                return isValid || 'Component name can only contain alphanumeric characters';
            },
        });
    }

    prompts.push(
        {
            type: 'input',
            name: 'folder',
            message: "Custom path under the component folder for saving your component",
            default: ""
        }
    );

    if (!frameworkFromFlag) {
      prompts.push({
          type: "list",
          name: "framework",
          message: "Pick a framework to create the component for",
          choices: ["Vue", "Angular", "React", "Svelte", "Qwik"]
        })
    }

    return inquirer.prompt(prompts).then((answers: {
        componentName: string,
        folder: string,
        framework: string
    })=>{
        const {folder} = answers;
        const framework = answers.framework || capitalizeFirstLetter(frameworkFromFlag);
        const componentName = answers.componentName || componentNameFromFlag;
        switch (framework) {
          case 'Vue':
            return vueWizard(componentName,folder);
          case 'Angular':
            return angularWizard(componentName,folder);
          case 'React':
            return reactWizard(componentName,folder);
          case 'Svelte':
            return svelteWizard(componentName,folder);
          case 'Qwik':
            return qwikWizard(componentName,folder);  
          default:
            throw new Error("A framework must be selected");
        }
      }
    )
    .then<Answers>((values: Answers | PromiseLike<Answers>) => {
      return values;
    })
    .catch((e: Error) => {
      throw new Error(e.message);
    });
};
export default wizard;
