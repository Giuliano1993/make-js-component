import * as fs from "fs";
import * as path from "node:path";
import { configs } from "./configs.cjs";
import { makeAngularComponent } from "./frameworks/angular/make-angular-component.mjs";

import inquirer from "inquirer";
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
	if (!fs.existsSync(destinationFolder)) {
		fs.mkdirSync(destinationFolder);
	}

	const templateFilePath: string = path.join(configs.INIT_PATH, "src", configs.STUBS_DIR, framework, template);
	fs.readFile(templateFilePath, "utf8", async (err: ErrnoException | null, data: string) => {
		const customDestinationFolder: string = path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder);
		const extension = template.substring(template.indexOf("."));
		const compFileName = `${componentName}${extension}`;

		if (!fs.existsSync(customDestinationFolder)) {
			fs.mkdirSync(customDestinationFolder, { recursive: true });
		}

		const filePathDestination: string = path.join(
			configs.BASE_DIR,
			configs.COMPONENT_FOLDER,
			customFolder,
			compFileName
		);
		let output = data;
		if (framework === "angular") {
			makeAngularComponent(filePathDestination, output, componentName);
		} else {
			if (template.indexOf("advanced") !== -1) {
				switch (framework) {
					case "vue":
						output = advancedVueBuilder(output, api, advancedOpts);
						break;
					default:
						break;
				}
			}
			output = output.replaceAll("ComponentName", capitalizeFirstLetter(componentName));
			await checkFileExists(filePathDestination, output);
			return filePathDestination;
		}
		if (path.parse(template).name === "function-component-css-module") {
			const styleFileName: string = `${componentName}.module.css`;
			const styleFilePathDestination: string = path.join(
				configs.BASE_DIR,
				configs.COMPONENT_FOLDER,
				customFolder,
				styleFileName
			);
			await checkFileExists(
				styleFilePathDestination,
				`.${componentName} {\n\tfont-size: 1.125rem; /* 18px */\n\tline-height: 1.75rem; /* 28px */\n\tfont-weight: bold;\n}\n`
			);
			return filePathDestination;
		}
	});
}

export async function checkFileExists(filePathDestination: string, data: string) {
	if (fs.existsSync(filePathDestination)) {
		console.log(`⚠️  A component with this name and extension already exists in ${filePathDestination}`);
		inquirer
			.prompt([
				{
					type: "confirm",
					name: "duplicateFile",
					message: "Do you want to continue with component creation? NOTE: this action will override the existing file",
					default: false,
				},
			])
			.then((answer: { duplicateFile: boolean }) => {
				if (answer.duplicateFile) {
					(async () => {
						await writeFile(filePathDestination, data);
					})();
				} else {
					return console.log("❌ File not created");
				}
			});
	} else {
		await writeFile(filePathDestination, data);
	}
}

async function writeFile(filePathDestination: string, data: string) {
	fs.writeFile(filePathDestination, data, (err: ErrnoException | null) => {
		if (err) {
			console.error(err);
		}
	});
}

export function createAnotherComponent() {
	enum vueApi {
		Composition = "composition",
		Option = "option",
	}

	wizard()
		.then((answers: Answers) => {
			const { componentName, framework, template, folder, advancedOpts, advanced } = answers;
			const api = template.indexOf("composition") !== -1 ? vueApi.Composition : vueApi.Option;
			const t = advanced ? "advanced-component.vue" : template;
			createComponent(componentName, framework, t, folder, api, advancedOpts);
		})
		.catch((e: Error) => {
			console.error(e.message);
		});
	return;
}

export function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
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
			when: (answers: {
				nuxt: string;
				api: string;
				advanced: boolean;
				anotherComponent: boolean;
			}) => {
				return answers.advanced;
			},
			default: false,
		},
	];

	return [...arr];
}
