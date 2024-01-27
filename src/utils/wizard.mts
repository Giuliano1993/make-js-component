import { Command, OptionValues } from "commander";
import inquirer from "inquirer";
import angularWizard from "./frameworks/angular/angular.mjs";
import astroWizard from "./frameworks/astro/astro.mjs";
import qwikWizard from "./frameworks/qwik/qwik.mjs";
import reactWizard from "./frameworks/react/react.mjs";
import svelteWizard from "./frameworks/svelte/svelte.mjs";
import vueWizard from "./frameworks/vue/vue.mjs";
import { capitalizeFirstLetter } from "./utils.mjs";

const program = new Command();

export type Answers = {
	componentName: string;
	framework: string;
	template: string;
	folder: string;
	anotherComponent: boolean;
	advanced?: boolean;
	advancedOpts?: string[];
	api?: string;
};

type FrameworkFromFlagType = "vue" | "angular" | "react" | "svelte" | "qwik" | "astro" | "";

type FrameworksType = "Vue" | "Angular" | "React" | "Svelte" | "Qwik" | "Astro";

interface PromptProps {
	readonly type: string;
	readonly name: string;
	readonly message: string;
	readonly validate?: (input: string) => boolean | string;
	readonly default?: string | boolean;
	readonly choices?: FrameworksType[];
}

const wizard: () => Promise<Answers> = async () => {
	// Parse command line arguments using commander
	const frameworks: FrameworksType[] = ["Vue", "Angular", "React", "Svelte", "Qwik", "Astro"];

	program
		.option("--name <value>", "Specify a name")
		.option("-f, --framework <value>", `Specify framework [${frameworks.join("|")}]`)
		.option("--vue", "Create a Vue component")
		.option("--angular", "Create an Angular component")
		.option("--react", "Create a React component")
		.option("--svelte", "Create a Svelte component")
		.option("--qwik", "Create a Qwik component")
		.option("--astro", "Create an Astro component")
		.option("--folder <value>", "Specify the subfolder")
		.option("--multiple", "Creating multiple components at once")
		.parse(process.argv);

	const options: OptionValues = program.opts();
	const componentNameFromFlag: string = options.name || "";

	const frameworkFromFlag: FrameworkFromFlagType =
		options.framework || options.vue
			? "vue"
			: null || options.angular
			  ? "angular"
			  : null || options.react
				  ? "react"
				  : null || options.svelte
					  ? "svelte"
					  : null || options.qwik
						  ? "qwik"
						  : null || options.astro
							  ? "astro"
							  : null || "";

	const folderFromFlag: string = options.folder || "";
	const multipleFromFlag: boolean = options.multiple || false;

	const prompts: PromptProps[] = [];

	// Only ask for componentName if --name argument is not provided
	if (!componentNameFromFlag) {
		prompts.push({
			type: "input",
			name: "componentName",
			message: "Give a name to your component",
			validate: (input: string) => {
				const trimmedInput: string = input.trim();
				if (trimmedInput === "") {
					return "Component name cannot be empty";
				}
				// Use a regular expression to check for only alphanumeric characters
				const isValid: boolean = /^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/.test(trimmedInput);
				return isValid || "Component name can only contain alphanumeric characters";
			},
		});
	}

	if (!folderFromFlag) {
		prompts.push({
			type: "input",
			name: "folder",
			message: "Custom path for the component (default: src/components)",
			default: "",
		});
	}

	if (!frameworkFromFlag) {
		prompts.push({
			type: "list",
			name: "framework",
			message: "Pick a framework to create the component for",
			choices: frameworks,
		});
	}

	if (!multipleFromFlag) {
		prompts.push({
			type: "confirm",
			name: "anotherComponent",
			message: "Do you want to create another component?",
			default: false,
		});
	}

	return inquirer
		.prompt(prompts)
		.then(
			(answers: {
				componentName: string;
				folder: string;
				framework: string;
				anotherComponent: boolean;
			}) => {
				const folder: string = answers.folder || folderFromFlag;
				const framework: string = answers.framework || capitalizeFirstLetter(frameworkFromFlag);
				const componentName: string = answers.componentName || componentNameFromFlag;
				const anotherComponent: boolean = answers.anotherComponent || multipleFromFlag;

				switch (framework) {
					case "Vue":
						return vueWizard(componentName, folder, anotherComponent);
					case "Angular":
						return angularWizard(componentName, folder, anotherComponent);
					case "React":
						return reactWizard(componentName, folder, anotherComponent);
					case "Svelte":
						return svelteWizard(componentName, folder, anotherComponent);
					case "Qwik":
						return qwikWizard(componentName, folder, anotherComponent);
					case "Astro":
						return astroWizard(componentName, folder, anotherComponent);
					default:
						throw new Error("A valid framework must be selected");
				}
			}
		)
		.then<Answers>((values: Answers | PromiseLike<Answers>) => {
			return values;
		})
		.catch((e: Error) => {
			throw new Error(e.message);
		});
};
export default wizard;
