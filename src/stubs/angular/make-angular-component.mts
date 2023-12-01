import { writeFile } from '../../utils/utils.mjs';

export function makeAngularComponent(filePathDestination: string, component: string, componentName: string): void {
	component = component.replace(/selector: 'SelectorName'/, `selector: 'app-${convertFromCamelCase(componentName)}'`);
	component = component.replace(/ComponentName/g, `${convertToCamelCase(componentName)}Component`);
	writeFile(filePathDestination, component);
}

function convertToCamelCase(string: string): string {
	return string.replace(/-([a-z])/g, (s: string) => {
		return s.toUpperCase();
	}).replace(/^[a-z]/, (s) => {
		return s.toUpperCase();
	});
}

function convertFromCamelCase(string: string): string {
	return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}