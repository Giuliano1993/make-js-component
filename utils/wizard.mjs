import inquirer from 'inquirer';
const wizard = async () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "componentName",
            message: "give a name to your component",
            validate: (input) => {
                return input.trim() !== '' ? true : 'Component name cannot be empty';
            }
        },
        {
            type: 'input',
            name: 'folder',
            message: "custom path under the component folder for saving your component",
            default: ""
        },
        {
            type: "list",
            name: "framework",
            message: "pick a framework to create the component for",
            choices: ["vue", "angular", "react"]
        }
    ]).then((answers) => {
        const { componentName, framework, folder } = answers;
        if (framework === 'vue') {
            return inquirer.prompt([{
                    type: "list",
                    name: "api",
                    message: "choose wich api to use",
                    choices: ["Composition API", "Options API"]
                }]).then((answers) => {
                return {
                    componentName: componentName,
                    framework: framework,
                    template: answers.api === "Composition API" ? "component-composition.vue" : "component-options.vue",
                    folder: folder
                };
            });
        }
        else if (framework === 'angular') {
            return {
                componentName: componentName,
                framework: framework,
                template: "component.component.js",
                folder: answers.folder
            };
        }
        else if (framework === "react") {
            return inquirer
                .prompt([
                {
                    type: "confirm",
                    name: "typescript",
                    message: "use typescript?",
                    default: true,
                },
            ])
                .then((answers) => {
                return {
                    componentName: componentName,
                    framework: framework,
                    template: answers.typescript
                        ? "function-component.tsx"
                        : "function-component.jsx",
                    folder: folder,
                };
            });
        }
        else {
            throw new Error("a framework must be selected");
        }
    }).then((values) => {
        return values;
    }).catch((e) => {
        throw new Error(e.message);
    });
};
export default wizard;
