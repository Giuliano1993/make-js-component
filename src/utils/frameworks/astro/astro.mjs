const framework = "astro";
export default function (componentName, folder, anotherComponent) {
    return {
        componentName: componentName,
        framework: framework.toLowerCase(),
        template: "component.astro",
        folder: folder,
        anotherComponent: anotherComponent,
    };
}
