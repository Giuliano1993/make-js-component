import inquirer from 'inquirer';
import { Command } from 'commander';
const program = new Command();
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
            validate: (input) => {
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
            choices: ["Vue", "Angular", "React", "Svelte", "Qwik"]
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
                template: "component.component.ts",
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
                return inquirer.prompt([
                    {
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
                        template: template,
                        folder: folder,
                    };
                });
            });
        }
        else if (framework === "Svelte") {
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
                        ? "component-ts.svelte"
                        : "component-js.svelte",
                    folder: folder,
                };
            });
        }
        else if (framework === 'Qwik') {
            return inquirer.prompt([{
                    type: "list",
                    name: "type",
                    message: "Choose wich type of component to create",
                    choices: ["Hello World", "useStore", "useStyles"],
                },
            ])
                .then((answers) => {
                return {
                    componentName: componentName,
                    framework: framework.toLowerCase(),
                    template: answers.type === "Hello World"
                        ? "hello-world-component.tsx"
                        : answers.type === "useStore"
                            ? "usestore-component.tsx"
                            : answers.type === "useStyles"
                                ? "usestyles-component.tsx"
                                : "hello-world-component.tsx",
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
