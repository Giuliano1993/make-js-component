import * as fs from "fs";
import * as path from "node:path";
import inquirer from "inquirer";
import { configs } from "./configs.cjs";
import { makeAngularComponent } from "./frameworks/angular/make-angular-component.mjs";
import advancedVueBuilder, { vueApi } from "./frameworks/vue/helper.mjs";
import wizard, { Answers } from "./wizard.mjs";

export interface ErrnoException extends Error {
	errno?: number | undefined;
	code?: string | undefined;
	path?: string | undefined;
	syscall?: string | undefined;
}

export default async function createComponent(
	componentName: string,
	framework: string,
	template: string,
	customFolder: string,
	api: vueApi,
	advancedOpts: string[] | undefined
) {
	const destinationFolder: string = `${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`;
	await fs.promises.mkdir(destinationFolder, { recursive: true });

	const templateFilePath: string = path.join(configs.INIT_PATH, "src", configs.STUBS_DIR, framework, template);
	const data = await fs.promises.readFile(templateFilePath, "utf8");
	const customDestinationFolder: string = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder);
	const extension = template.substring(template.indexOf("."));
	const compFileName = `${componentName}${extension}`;
	const formattedComponentName = toPascalCase(componentName);

	await fs.promises.mkdir(customDestinationFolder, { recursive: true });

	const filePathDestination: string = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, compFileName);
	let output = data;

	if (framework === "angular") {
		await makeAngularComponent(filePathDestination, output, componentName, customFolder);
		return filePathDestination;
	}

	if (template.indexOf("advanced") !== -1) {
		switch (framework) {
			case "vue":
				output = advancedVueBuilder(output, api, advancedOpts);
				break;
			default:
				break;
		}
	}

	output = output.replaceAll("ComponentName", formattedComponentName);
	if (path.parse(template).name === "function-component-css-module") {
		output = output.replaceAll(`"./${formattedComponentName}.module.css"`, `"./${componentName}.module.css"`);
	}

	const componentWasCreated = await checkFileExists(filePathDestination, output);
	if (componentWasCreated && path.parse(template).name === "function-component-css-module") {
		const styleFileName: string = `${componentName}.module.css`;
		const styleFilePathDestination: string = path.join(
			configs.BASE_DIR,
			configs.COMPONENT_FOLDER,
			customFolder,
			styleFileName
		);
		await checkFileExists(
			styleFilePathDestination,
			`.${formattedComponentName} {\n\tfont-size: 1.125rem; /* 18px */\n\tline-height: 1.75rem; /* 28px */\n\tfont-weight: bold;\n}\n`
		);
	}

	return componentWasCreated ? filePathDestination : undefined;
}

export async function checkFileExists(filePathDestination: string, data: string): Promise<boolean> {
	if (fs.existsSync(filePathDestination)) {
		console.log(`Warning: A component with this name and extension already exists in ${filePathDestination}`);
		const answer = await inquirer.prompt([
			{
				type: "confirm",
				name: "duplicateFile",
				message: "Do you want to continue with component creation? NOTE: this action will override the existing file",
				default: false,
			},
		]);

		if (!answer.duplicateFile) {
			console.log("File not created");
			return false;
		}
	}

	await writeFile(filePathDestination, data);
	return true;
}

async function writeFile(filePathDestination: string, data: string) {
	try {
		await fs.promises.writeFile(filePathDestination, data);
	} catch (err) {
		console.error(err as ErrnoException);
	}
}

export function createAnotherComponent() {
	enum vueApi {
		Composition = "composition",
		Option = "option",
	}

	wizard()
		.then((answers: Answers) => {
			const { componentName, framework, template, folder, anotherComponent, advancedOpts, advanced } = answers;
			const api = template.indexOf("composition") !== -1 ? vueApi.Composition : vueApi.Option;
			const t = advanced ? "advanced-component.vue" : template;
			createComponent(componentName, framework, t, folder, api, advancedOpts);
			if (anotherComponent) {
				createAnotherComponent();
			}
		})
		.catch((e: Error) => {
			console.error(e.message);
		});
	return;
}

export function capitalizeFirstLetter(string: string): string {
	return toPascalCase(string);
}

export function toPascalCase(value: string): string {
	return value
		.split(/[-_\s]+/)
		.filter(Boolean)
		.map(part => part.charAt(0).toUpperCase() + part.slice(1))
		.join("");
}

export function prepareAdvanced(options: string[]) {
	const arr = [
		{
			type: "confirm",
			name: "advanced",
			message: "Do you want to check for advanced options?",
			default: false,
		},
		{
			type: "checkbox",
			name: "advancedOpts",
			message: "Pick the parts you want in your component?",
			choices: options,
			when: (answers: { nuxt: string; api: string; advanced: boolean }) => {
				return answers.advanced;
			},
			default: false,
		},
	];

	return [...arr];
}
