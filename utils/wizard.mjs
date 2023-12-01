import inquirer from 'inquirer';
import { Command } from 'commander';
const program = new Command();
const wizard = async () => {
    // Parse command line arguments using commander
    program
        .option('--name <value>', 'Specify a name')
        .option('-f, --framework <value>', 'Specify framework (Vue, Angular, React)')
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
    prompts.push({
        type: 'input',
        name: 'folder',
        message: "Custom path under the component folder for saving your component",
        default: ""
    });
    if (!frameworkFromFlag) {
        prompts.push({
            type: "list",
            name: "framework",
            message: "Pick a framework to create the component for",
            choices: ["Vue", "Angular", "React"]
        });
    }
    return inquirer.prompt(prompts).then((answers) => {
        const { folder } = answers;
        const framework = answers.framework || frameworkFromFlag;
        const componentName = answers.componentName || componentNameFromFlag;
        if (framework === 'Vue') {
            return inquirer.prompt([{
                    type: "list",
                    name: "api",
                    message: "Choose wich api to use",
                    choices: ["Composition API", "Options API"],
                },
            ])
                .then((answers) => {
                return {
                    componentName: componentName,
                    framework: framework.toLowerCase(),
                    template: answers.api === "Composition API"
                        ? "component-composition.vue"
                        : "component-options.vue",
                    folder: folder,
                };
            });
        }
        else if (framework === "Angular") {
            return {
                componentName: componentName,
                framework: framework.toLowerCase(),
                template: "component.component.js",
                folder: answers.folder,
            };
        }
        else if (framework === "React") {
            return inquirer
                .prompt([
                {
                    type: "confirm",
                    name: "typescript",
                    message: "Do you want to use Typescript?",
                    default: true,
                },
            ])
                .then((answers) => {
                return {
                    componentName: componentName,
                    framework: framework.toLowerCase(),
                    template: answers.typescript
                        ? "function-component.tsx"
                        : "function-component.jsx",
                    folder: folder,
                };
            });
        }
        else {
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
