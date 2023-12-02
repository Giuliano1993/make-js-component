import * as fs from 'fs';
import path from 'path';
import { writeFile } from '../../utils/utils.mjs';
import { configs } from '../../utils/configs.cjs';
export function makeAngularComponent(filePathDestination, component, componentName) {
    component = component.replace(/selector: 'SelectorName'/, `selector: 'app-${convertFromCamelCase(componentName)}'`);
    component = replaceComponentName(component, componentName);
    writeFile(filePathDestination, component);
    makeAngularComponentTest(componentName);
}
function makeAngularComponentTest(componentName) {
    const templateFileTestPath = path.join(configs.INIT_PATH, 'src', configs.STUBS_DIR, 'angular', 'component.component.spec.ts');
    fs.readFile(templateFileTestPath, 'utf8', (err, component) => {
        component = replaceComponentName(component, componentName);
        const filePathDestination = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, `${componentName}.component.spec.ts`);
        writeFile(filePathDestination, component);
    });
}
function convertToCamelCase(string) {
    return string.replace(/-([a-z])/g, (s) => {
        return s.toUpperCase();
    }).replace(/^[a-z]/, (s) => {
        return s.toUpperCase();
    });
}
function convertFromCamelCase(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function replaceComponentName(data, componentName) {
    return data.replace(/ComponentName/g, `${convertToCamelCase(componentName)}Component`);
}
