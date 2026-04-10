import inquirer from "inquirer";
const framework = "react";
export default function (componentName, folder) {
    return inquirer
        .prompt([
        {
            type: "confirm",
            name: "typescript",
            message: "Do you want to use Typescript?",
            default: true,
        },
        {
            type: "list",
            name: "css",
            message: "Do you want to use any CSS framework?",
            choices: ["Tailwind", "Styled Components", "CSS Module", "No"],
            default: "No",
        },
    ])
        .then((answers) => {
        const { typescript } = answers;
        const { css } = answers;
        const extension = typescript ? "tsx" : "jsx";
        let templateBase = "function-component";
        switch (css) {
            case "Tailwind":
                templateBase += "-tailwind";
                break;
            case "Styled Components":
                templateBase += "-styled-components";
                break;
            case "CSS Module":
                templateBase += "-css-module";
                break;
            default:
                break;
        }
        const template = `${templateBase}.${extension}`;
        return {
            componentName: componentName,
            framework: framework.toLowerCase(),
            template: template,
            folder: folder,
        };
    });
}
