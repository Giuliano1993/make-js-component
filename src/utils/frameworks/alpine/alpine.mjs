import inquirer from "inquirer";

const framework = "alpine";

export default function (componentName, folder) {
	return inquirer
		.prompt([
			{
				type: "confirm",
				name: "typescript",
				message: "Do you want to use Typescript?",
				default: true,
			},
		])
		.then((answers) => {
			const { typescript } = answers;
			const extension = typescript ? "ts" : "js";
			const template = `function-component.${extension}`;

			return {
				componentName: componentName,
				framework: framework.toLowerCase(),
				template: template,
				folder: folder,
			};
		});
}