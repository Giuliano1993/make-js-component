import inquirer from "inquirer";
const framework = "svelte";
export default function (componentName, folder, anotherComponent) {
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
            anotherComponent: anotherComponent,
        };
    });
}
