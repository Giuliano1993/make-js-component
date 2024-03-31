const framework = "astro";

export default function (componentName: string, folder: string) {
	return {
		componentName: componentName,
		framework: framework.toLowerCase(),
		template: "component.astro",
		folder: folder,
	};
}
