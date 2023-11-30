import inquirer from "inquirer";
import { Answers } from "../../../types/index.mjs";

const framework = "react";


const getComponentTemplate = (useTypescript: boolean) => {
    return useTypescript ? "function-component.tsx" : "function-component.jsx";
};

const reactWizard = (componentName: string, folder: string, useTypescript?: boolean): Answers | PromiseLike<Answers> => {
    if (useTypescript) {
        return {
            componentName,
            folder,
            framework,
            template: getComponentTemplate(true),
        };
    }

    return inquirer
        .prompt([
        {
            type: "confirm",
            name: "typescript",
            message: "Do you want to use Typescript?",
            default: true,
        },
        ])
        .then((answers: { typescript: boolean }) => {
        return {
            componentName,
            folder,
            framework,
            template: getComponentTemplate(answers.typescript),
        };
        });
}

export default reactWizard;