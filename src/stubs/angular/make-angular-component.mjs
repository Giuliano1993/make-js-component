import { writeFile } from '../../utils/utils.mjs';
export function makeAngularComponent(filePathDestination, component, componentName) {
    component = component.replace(/selector: 'SelectorName'/, `selector: 'app-${convertFromCamelCase(componentName)}'`);
    component = component.replace(/ComponentName/g, `${convertToCamelCase(componentName)}Component`);
    writeFile(filePathDestination, component);
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
