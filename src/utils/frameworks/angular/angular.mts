import { Answers } from "../../wizard.mjs";

const framework = "angular";

export default function (componentName: string, folder: string, anotherComponent: boolean, isTestFile: boolean): Answers {
	return {
		componentName: componentName,
		framework: framework.toLowerCase(),
		template: "component.component.ts",
		isTestFile: isTestFile,
		folder: folder,
		anotherComponent: anotherComponent,
	};
}
