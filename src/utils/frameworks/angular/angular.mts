const framework = "angular";

export default function (componentName: string, folder: string, testFile: boolean) {
	return {
		componentName: componentName,
		framework: framework.toLowerCase(),
		template: "component.component.ts",
		testFile: testFile,
		folder: folder,
	};
}
