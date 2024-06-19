import * as fs from "fs";
import path from "path";
import { configs } from "../../configs.cjs";
import { ErrnoException, checkFileExists } from "../../utils.mjs";

export function makeAngularComponent(
	filePathDestination: string,
	component: string,
	componentName: string,
	testFile?: boolean
): void {
	let componentContent = component.replace(
		/selector: 'SelectorName'/,
		`selector: 'app-${convertFromCamelCase(componentName)}'`
	);
	componentContent = replaceComponentName(componentContent, componentName);

	checkFileExists(filePathDestination, componentContent);

	if (testFile) {
		makeAngularComponentTest(componentName);
	}
}

function makeAngularComponentTest(componentName: string): void {
	const templateFileTestPath: string = path.join(
		configs.INIT_PATH,
		"src",
		configs.STUBS_DIR,
		"angular",
		"component.component.spec.ts"
	);
	fs.readFile(templateFileTestPath, "utf8", (err: ErrnoException | null, component: string) => {
		const componentContent = replaceComponentName(component, componentName);
		const filePathDestination: string = path.join(
			configs.BASE_DIR,
			configs.COMPONENT_FOLDER,
			`${componentName}.component.spec.ts`
		);
		checkFileExists(filePathDestination, componentContent);
	});
}

function convertToCamelCase(string: string): string {
	return string
		.replace(/-(\w)/g, (_, match: string) => {
			return match.toUpperCase();
		})
		.replace(/^\w/, (match: string) => {
			return match.toUpperCase();
		});
}

function convertFromCamelCase(string: string): string {
	return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function replaceComponentName(data: string, componentName: string): string {
	console.log("componentName", componentName);
	return data.replace(/ComponentName/g, `${convertToCamelCase(componentName)}Component`);
}
