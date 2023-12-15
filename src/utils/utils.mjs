import * as fs from "fs";
import * as path from "node:path";
import { configs } from "./configs.cjs";
import { makeAngularComponent } from "./frameworks/angular/make-angular-component.mjs";
import advancedVueBuilder from "./frameworks/vue/helper.mjs";
const createComponent = (componentName, framework, template, customFolder, api, advancedOpts) => {
    const destinationFolder = `${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`;
    if (!fs.existsSync(destinationFolder)) {
        fs.mkdirSync(destinationFolder);
    }
    const templateFilePath = path.join(configs.INIT_PATH, "src", configs.STUBS_DIR, framework, template);
    fs.readFile(templateFilePath, "utf8", (err, data) => {
        const customDestinationFolder = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder);
        const extension = template.substring(template.indexOf("."));
        const compFileName = `${componentName}${extension}`;
        if (!fs.existsSync(customDestinationFolder)) {
            fs.mkdirSync(customDestinationFolder, { recursive: true });
        }
        const filePathDestination = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, compFileName);
        let output = data;
        if (framework === "angular") {
            makeAngularComponent(filePathDestination, output, componentName);
        }
        else {
            if (template.indexOf("advanced") !== -1) {
                switch (framework) {
                    case "vue":
                        output = advancedVueBuilder(output, api, advancedOpts);
                        break;
                    default:
                        break;
                }
            }
            output = output.replaceAll("ComponentName", capitalizeFirstLetter(componentName));
            writeFile(filePathDestination, output);
        }
        if (path.parse(template).name === "function-component-css-module") {
            const styleFileName = `${componentName}.module.css`;
            const styleFilePathDestination = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, styleFileName);
            writeFile(styleFilePathDestination, `.${componentName} {\n\tfont-size: 1.125rem; /* 18px */\n\tline-height: 1.75rem; /* 28px */\n\tfont-weight: bold;\n}\n`);
        }
    });
};
export default createComponent;
export function writeFile(filePathDestination, data) {
    fs.writeFile(filePathDestination, data, (err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log(`✅ CREATE Component: ${filePathDestination}`);
        }
    });
}
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export function prepareAdvanced(options) {
    const arr = [
        {
            type: "confirm",
            name: "advanced",
            message: "Do you want to check for advanced otpions?",
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
