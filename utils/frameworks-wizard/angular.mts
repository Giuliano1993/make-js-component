import { Answers } from "../wizard.mjs";

const framework = "angular";

export default function (componentName: string, folder: string): Answers {
	return {
		componentName: componentName,
		framework: framework.toLowerCase(),
		template: "component.component.ts",
		folder: folder,
	};
}