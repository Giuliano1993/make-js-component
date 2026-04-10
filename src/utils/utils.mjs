import * as fs from "fs";
import * as path from "node:path";
import inquirer from "inquirer";
import { configs } from "./configs.cjs";
import { makeAngularComponent } from "./frameworks/angular/make-angular-component.mjs";
import advancedVueBuilder from "./frameworks/vue/helper.mjs";
import wizard from "./wizard.mjs";
export default async function createComponent(componentName, framework, template, customFolder, api, advancedOpts) {
    const destinationFolder = `${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`;
    await fs.promises.mkdir(destinationFolder, { recursive: true });
    const templateFilePath = path.join(configs.INIT_PATH, "src", configs.STUBS_DIR, framework, template);
    const data = await fs.promises.readFile(templateFilePath, "utf8");
    const customDestinationFolder = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder);
    const extension = template.substring(template.indexOf("."));
    const compFileName = `${componentName}${extension}`;
    const formattedComponentName = toPascalCase(componentName);
    await fs.promises.mkdir(customDestinationFolder, { recursive: true });
    const filePathDestination = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, compFileName);
    let output = data;
    if (framework === "angular") {
        await makeAngularComponent(filePathDestination, output, componentName, customFolder);
        return filePathDestination;
    }
    if (template.indexOf("advanced") !== -1) {
        switch (framework) {
            case "vue":
                output = advancedVueBuilder(output, api, advancedOpts);
                break;
            default:
                break;
        }
    }
    output = output.replaceAll("ComponentName", formattedComponentName);
    if (path.parse(template).name === "function-component-css-module") {
        output = output.replaceAll(`"./${formattedComponentName}.module.css"`, `"./${componentName}.module.css"`);
    }
    const componentWasCreated = await checkFileExists(filePathDestination, output);
    if (componentWasCreated && path.parse(template).name === "function-component-css-module") {
        const styleFileName = `${componentName}.module.css`;
        const styleFilePathDestination = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, styleFileName);
        await checkFileExists(styleFilePathDestination, `.${formattedComponentName} {\n\tfont-size: 1.125rem; /* 18px */\n\tline-height: 1.75rem; /* 28px */\n\tfont-weight: bold;\n}\n`);
    }
    return componentWasCreated ? filePathDestination : undefined;
}
export async function checkFileExists(filePathDestination, data) {
    if (fs.existsSync(filePathDestination)) {
        console.log(`Warning: A component with this name and extension already exists in ${filePathDestination}`);
        const answer = await inquirer.prompt([
            {
                type: "confirm",
                name: "duplicateFile",
                message: "Do you want to continue with component creation? NOTE: this action will override the existing file",
                default: false,
            },
        ]);
        if (!answer.duplicateFile) {
            console.log("File not created");
            return false;
        }
    }
    await writeFile(filePathDestination, data);
    return true;
}
async function writeFile(filePathDestination, data) {
    try {
        await fs.promises.writeFile(filePathDestination, data);
    }
    catch (err) {
        console.error(err);
    }
}
export function createAnotherComponent() {
    let vueApi;
    (function (vueApi) {
        vueApi["Composition"] = "composition";
        vueApi["Option"] = "option";
    })(vueApi || (vueApi = {}));
    wizard()
        .then((answers) => {
        const { componentName, framework, template, folder, anotherComponent, advancedOpts, advanced } = answers;
        const api = template.indexOf("composition") !== -1 ? vueApi.Composition : vueApi.Option;
        const t = advanced ? "advanced-component.vue" : template;
        createComponent(componentName, framework, t, folder, api, advancedOpts);
        if (anotherComponent) {
            createAnotherComponent();
        }
    })
        .catch((e) => {
        console.error(e.message);
    });
    return;
}
export function capitalizeFirstLetter(string) {
    return toPascalCase(string);
}
export function toPascalCase(value) {
    return value
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");
}
export function prepareAdvanced(options) {
    const arr = [
        {
            type: "confirm",
            name: "advanced",
            message: "Do you want to check for advanced options?",
            default: false,
        },
        {
            type: "checkbox",
            name: "advancedOpts",
            message: "Pick the parts you want in your component?",
            choices: options,
            when: (answers) => {
                return answers.advanced;
            },
            default: false,
        },
    ];
    return [...arr];
}
