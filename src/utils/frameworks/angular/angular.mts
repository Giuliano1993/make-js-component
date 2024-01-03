import { Answers } from "../../wizard.mjs";

const framework = "angular";

export default function (
	componentName: string,
	folder: string,
	anotherComponent: boolean
): Answers {
	return {
		componentName: componentName,
		framework: framework.toLowerCase(),
		template: "component.component.ts",
		folder: folder,
		anotherComponent: anotherComponent,
	};
}
