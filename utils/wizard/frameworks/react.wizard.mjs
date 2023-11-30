import inquirer from "inquirer";
const framework = "react";
const getComponentTemplate = (useTypescript) => {
    return useTypescript ? "function-component.tsx" : "function-component.jsx";
};
const reactWizard = (componentName, folder, useTypescript) => {
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
        .then((answers) => {
        return {
            componentName,
            folder,
            framework,
            template: getComponentTemplate(answers.typescript),
        };
    });
};
export default reactWizard;
