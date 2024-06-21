import inquirer from "inquirer";

const framework = "angular";

export default function (componentName: string, folder: string) {
	return inquirer
		.prompt([
			{
				type: "confirm",
				name: "testFile",
				message: "Do you want to add .spec file to test component?",
				default: false,
			},
		])
		.then((answers: { testFile: boolean }) => {
			return {
				componentName: componentName,
				framework: framework.toLowerCase(),
				testFile: answers.testFile,
				template: "component.component.ts",
				folder: folder,
			};
		});
}
