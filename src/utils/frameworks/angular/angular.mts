const framework = "angular";

export default function (componentName: string, folder: string, testFile: boolean) {
	return {
		componentName: componentName,
		framework: framework.toLowerCase(),
		testFile: testFile,
		template: "component.component.ts",
		folder: folder,
	};
}
