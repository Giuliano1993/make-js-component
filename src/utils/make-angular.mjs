import * as fs from 'fs';
import * as path from "node:path";
import { configs } from './configs.cjs';

export default function makeAngular(filePath, componentName, customFolder) {

	fs.readFile(filePath, 'utf8', (err, component) => {
		if (err) {
			console.error(err);
			return;
		}

		component = component.replace(/selector: 'SelectorName'/, `selector: 'app-${convertFromCamelCase(componentName)}'`);
		component = component.replace(/ComponentName/g, `${convertToCamelCase(componentName)}Component`);
		const fp = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, convertFromCamelCase(componentName) + '.component.ts');

		fs.writeFile(fp, component, 'utf8', (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log(`${componentName}.`);
			}
		});

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