import * as fs from "fs";
import path from "path";
import { configs } from "../../configs.cjs";
import { checkFileExists } from "../../utils.mjs";
export async function makeAngularComponent(filePathDestination, component, componentName, customFolder) {
    let componentContent = component.replace(/selector:\s*["']SelectorName["']/, `selector: "app-${convertFromCamelCase(componentName)}"`);
    componentContent = replaceComponentName(componentContent, componentName);
    await checkFileExists(filePathDestination, componentContent);
    await makeAngularComponentTest(componentName, customFolder);
}
async function makeAngularComponentTest(componentName, customFolder) {
    const templateFileTestPath = path.join(configs.INIT_PATH, "src", configs.STUBS_DIR, "angular", "component.component.spec.ts");
    const component = await fs.promises.readFile(templateFileTestPath, "utf8");
    const componentContent = replaceComponentName(component, componentName);
    const filePathDestination = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, `${componentName}.component.spec.ts`);
    await checkFileExists(filePathDestination, componentContent);
}
function convertToCamelCase(string) {
    return string
        .split("-")
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");
}
function convertFromCamelCase(string) {
    return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function replaceComponentName(data, componentName) {
    return data.replace(/ComponentName/g, `${convertToCamelCase(componentName)}Component`);
}
