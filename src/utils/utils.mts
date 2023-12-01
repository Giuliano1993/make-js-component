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

		const filePathDestination: string = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, compFileName);

		if (framework === 'angular') {
			makeAngularComponent(filePathDestination, data, componentName);
		} else {
			data = data.replaceAll("ComponentName", capitalizeFirstLetter(componentName));
			writeFile(filePathDestination, data);
		}
		if (
            template == 'function-component-css-module.jsx'
            || template == 'function-component-css-module.tsx'
        ) {
            const styleFileName: string = `${componentName}.module.css`;
            const styleFilePathDestination: string = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, styleFileName);
            writeFile(styleFilePathDestination, `.${componentName} {\n\tfont-size: 1.125rem; /* 18px */\n\tline-height: 1.75rem; /* 28px */\n\tfont-weight: bold;\n}\n`);
        }
	});
}

export default createComponent;

export function writeFile(filePathDestination: string, data: string): void {
	fs.writeFile(filePathDestination, data, (err: ErrnoException | null) => {
		if (err) {
			console.error(err);
		} else {
			console.log('✅ CREATE Component: ' + filePathDestination);
		}
	});
}