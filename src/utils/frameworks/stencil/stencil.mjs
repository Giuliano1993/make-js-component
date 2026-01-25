import inquirer from "inquirer";

const framework = "stencil";

export default function (componentName, folder) {
	return inquirer
		.prompt([
			{
				type: "confirm",
				name: "shadow",
				message: "Do you want to use Shadow DOM?",
				default: true,
			},
		])
		.then((answers) => {
			const { shadow } = answers;
			const template = shadow ? "component-shadow.tsx" : "component.tsx";

			return {
				componentName: componentName,
				framework: framework.toLowerCase(),
				template: template,
				folder: folder,
			};
		});
}