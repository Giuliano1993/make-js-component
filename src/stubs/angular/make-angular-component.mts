import * as fs from "fs";
import path from "path";
import {ErrnoException, writeFile} from "../../utils/utils.mjs";
import {configs} from "../../utils/configs.cjs";

export function makeAngularComponent(
	filePathDestination: string,
	component: string,
	componentName: string
): void {
	component = component.replace(
		/selector: 'SelectorName'/,
		`selector: 'app-${convertFromCamelCase(componentName)}'`
	);
	component = replaceComponentName(component, componentName);

	writeFile(filePathDestination, component);
	makeAngularComponentTest(componentName);
}

function makeAngularComponentTest(componentName: string): void {
	const templateFileTestPath: string = path.join(
		configs.INIT_PATH,
		"src",
		configs.STUBS_DIR,
		"angular",
		"component.component.spec.ts"
	);
	fs.readFile(
		templateFileTestPath,
		"utf8",
		(err: ErrnoException | null, component: string) => {
			component = replaceComponentName(component, componentName);
			const filePathDestination: string = path.join(
				configs.BASE_DIR,
				configs.COMPONENT_FOLDER,
				`${componentName}.component.spec.ts`
			);
			writeFile(filePathDestination, component);
		}
	);
}

function convertToCamelCase(string: string): string {
	return string
		.replace(/-([a-z])/g, (s: string) => {
			return s.toUpperCase();
		})
		.replace(/^[a-z]/, s => {
			return s.toUpperCase();
		});
}

function convertFromCamelCase(string: string): string {
	return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function replaceComponentName(data: string, componentName: string): string {
	return data.replace(
		/ComponentName/g,
		`${convertToCamelCase(componentName)}Component`
	);
}
