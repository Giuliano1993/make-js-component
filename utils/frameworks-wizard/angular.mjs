const framework = "angular";
export default function (componentName, folder) {
    return {
        componentName: componentName,
        framework: framework.toLowerCase(),
        template: "component.component.ts",
        folder: folder,
    };
}
