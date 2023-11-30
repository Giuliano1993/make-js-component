import * as fs from 'fs';
import path from 'path';
import { configs } from '../../utils/configs.cjs';

export function makeAngularComponent(filePath: string, componentName: string, customFolder: string): void {

	fs.readFile(filePath, 'utf8', (err, component) => {

		component = component.replace(/selector: 'SelectorName'/, `selector: 'app-${convertFromCamelCase(componentName)}'`);
		component = component.replace(/ComponentName/g, `${convertToCamelCase(componentName)}Component`);
		const compileName: string = convertFromCamelCase(componentName) + '.component.ts';

		const fp = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, compileName);

		fs.writeFile(fp, component, 'utf8', (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log(`✅ CREATE Angular Component: ${fp}`);
			}
		});

	});

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