import inquirer from 'inquirer';
import { Command } from 'commander';
const program = new Command();
const wizard = async () => {
    // Parse command line arguments using commander
    program
        .option('--name <value>', 'Specify a name')
        .parse(process.argv);
    const options = program.opts();
    const componentNameFromFlag = options.name || '';
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
    }, {
        type: "list",
        name: "framework",
        message: "Pick a framework to create the component for",
        choices: ["Vue", "Angular", "React"]
    });
    return inquirer.prompt(prompts).then((answers) => {
        const { framework, folder } = answers;
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
                const { typescript } = answers;
                return inquirer.prompt([{
                        type: "list",
                        name: "css",
                        message: "Do you want to use any CSS framework?",
                        choices: ["Tailwind", "Styled Components", "No"],
                    },
                ]).then((answers) => {
                    const { css } = answers;
                    let template;
                    if (typescript) {
                        if (css === "Tailwind")
                            template = "function-component-tailwind.tsx";
                        else if (css === 'Styled Components')
                            template = "function-component-styled-components.tsx";
                        else
                            template = "function-component.tsx";
                    }
                    else {
                        if (css === "Tailwind")
                            template = "function-component-tailwind.jsx";
                        else if (css === 'Styled Components')
                            template = "function-component-styled-components.jsx";
                        else
                            template = "function-component.jsx";
                    }
                    return {
                        componentName: componentName,
                        framework: framework.toLowerCase(),
                        template,
                        folder: folder,
                    };
                });
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
