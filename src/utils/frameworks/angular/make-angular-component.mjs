import * as fs from "fs";
import path from "path";
import { configs } from "../../configs.cjs";
import { checkFileExists } from "../../utils.mjs";
export function makeAngularComponent(filePathDestination, component, componentName) {
    let componentContent = component.replace(/selector: 'SelectorName'/, `selector: 'app-${convertFromCamelCase(componentName)}'`);
    componentContent = replaceComponentName(componentContent, componentName);
    checkFileExists(filePathDestination, componentContent);
    makeAngularComponentTest(componentName);
}
function makeAngularComponentTest(componentName) {
    const templateFileTestPath = path.join(configs.INIT_PATH, "src", configs.STUBS_DIR, "angular", "component.component.spec.ts");
    fs.readFile(templateFileTestPath, "utf8", (err, component) => {
        const componentContent = replaceComponentName(component, componentName);
        const filePathDestination = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, `${componentName}.component.spec.ts`);
        checkFileExists(filePathDestination, componentContent);
    });
}
function convertToCamelCase(string) {
    return string
        .replace(/-(\w)/g, (_, match) => {
        return match.toUpperCase();
    })
        .replace(/^\w/, (match) => {
        return match.toUpperCase();
    });
}
function convertFromCamelCase(string) {
    return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function replaceComponentName(data, componentName) {
    console.log('componentName', componentName);
    return data.replace(/ComponentName/g, `${convertToCamelCase(componentName)}Component`);
}
