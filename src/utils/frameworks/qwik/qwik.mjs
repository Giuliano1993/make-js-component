import inquirer from "inquirer";
const framework = "qwik";
export default function (componentName, folder) {
    return inquirer
        .prompt([
        {
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
