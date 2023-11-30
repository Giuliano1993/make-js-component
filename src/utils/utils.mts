import * as fs from 'fs';
import * as path from "node:path";
import { configs } from './configs.cjs';
import { makeAngularComponent } from '../stubs/angular/make-angular-component.mjs';

interface ErrnoException extends Error {
	errno?: number | undefined;
	code?: string | undefined;
	path?: string | undefined;
	syscall?: string | undefined;
}

function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const createComponent = (componentName: string, framework: string, template: string, customFolder: string = '') => {

	const destinationFolder: string = `${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`;

	if (!fs.existsSync(destinationFolder)) {
		fs.mkdirSync(destinationFolder);
	}

	const templateFilePath: string = path.join(configs.INIT_PATH, 'src', configs.STUBS_DIR, framework, template);
	fs.readFile(templateFilePath, 'utf8', (err: ErrnoException | null, data: string) => {

		const customDestinationFolder: string = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder);
		const extension = template.substring(template.indexOf('.'));
		const compFileName = `${componentName}${extension}`;

		if (!fs.existsSync(customDestinationFolder)) {
			fs.mkdirSync(customDestinationFolder);
		}

		if (framework === 'Angular') {
			makeAngularComponent(templateFilePath, componentName, customFolder);
		} else {
			data = data.replaceAll("ComponentName", capitalizeFirstLetter(componentName));
			writeFile(customFolder, compFileName, data);
		}

	});
}

export default createComponent;

export function writeFile(customFolder: string, compFileName: string, data: string): void {
	fs.writeFile(path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, compFileName), data, (err: ErrnoException | null) => {
		if (err) {
			console.error(err)
		} else {
			console.log('Done ✅')
		}
	});
}