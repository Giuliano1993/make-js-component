const framework = "angular";
export default function (componentName, folder, anotherComponent) {
    return {
        componentName: componentName,
        framework: framework.toLowerCase(),
        template: "component.component.ts",
        folder: folder,
        anotherComponent: anotherComponent,
    };
}
