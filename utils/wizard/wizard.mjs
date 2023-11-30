import inquirer from 'inquirer';
import { Command } from 'commander';
import vueWizard from "./frameworks/vue.wizard.mjs";
import angularWizard from "./frameworks/angular.wizard.mjs";
import reactWizard from './frameworks/react.wizard.mjs';
const program = new Command();
const wizard = async () => {
    // Parse command line arguments using commander
    program
        .arguments("[name], [directory], [framework] [template]")
        .option('-n, --name <value>', 'Specify a name')
        .option('-d, --directory <value>', 'Specify a directory name')
        .option('-f, --framework <value>', 'Specify framework (Vue, Angular, React)')
        .option('-t, --template <value>', 'Specify a template (composition, options)')
        .option('-ts, --typescript', 'Use typescript')
        .parse(process.argv);
    const options = program.opts();
    const [componentNameFromArgs, folderFromArgs, frameworkNameFromArgs, templateFromArgs] = program.args;
    const componentNameFromCmd = options.name || componentNameFromArgs || '';
    const folderFromCmd = options.directory || folderFromArgs || '';
    const frameworkNameFromCmd = options.framework || frameworkNameFromArgs || '';
    const templateFromCmd = options.template || templateFromArgs || '';
    const useTypescript = !!options.typescript || undefined;
    const prompts = [];
    // Only ask for componentName if --name argument is not provided
    if (!componentNameFromCmd) {
        prompts.push({
            type: 'input',
            name: 'componentName',
            message: 'Give a name to your component',
            validate: (input) => {
                const trimmedInput = input.trim();
                if (trimmedInput === '') {
                    return 'Component name cannot be empty';
                }
                // Use a regular expression to check for only alphanumeric characters
                const isValid = /^[a-zA-Z0-9]+$/.test(trimmedInput);
                return isValid ? true : 'Component name can only contain alphanumeric characters';
            },
        });
    }
    if (!folderFromCmd) {
        prompts.push({
            type: 'input',
            name: 'folder',
            message: "Custom path under the component folder for saving your component",
            default: ""
        });
    }
    if (!frameworkNameFromCmd) {
        prompts.push({
            type: "list",
            name: "framework",
            message: "Pick a framework to create the component for",
            choices: ["Vue", "Angular", "React"]
        });
    }
    return inquirer.prompt(prompts).then((answers) => {
        const componentName = answers.componentName || componentNameFromCmd;
        const framework = answers.framework || frameworkNameFromCmd;
        const folder = answers.folder || folderFromCmd;
        const frameworkLower = framework.toLowerCase();
        switch (frameworkLower) {
            case 'vue':
                return vueWizard(componentName, folder, templateFromCmd);
            case "angular":
                return angularWizard(componentName, folder);
            case "react":
                return reactWizard(componentName, folder, useTypescript);
            default:
                throw new Error("A framework must be selected");
        }
    })
        .then((values) => {
        return values;
    })
        .catch((e) => {
        throw new Error(e.message);
    });
};
export default wizard;
