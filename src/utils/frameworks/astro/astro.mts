const framework = "astro";

export default function (
	componentName: string,
	folder: string,
	anotherComponent: boolean
) {
	return {
		componentName: componentName,
		framework: framework.toLowerCase(),
		template: "component.astro",
		folder: folder,
		anotherComponent: anotherComponent,
	};
}
