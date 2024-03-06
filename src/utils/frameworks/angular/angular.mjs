const framework = "angular";
export default function (componentName, folder, anotherComponent, isTestFile) {
    return {
        componentName: componentName,
        framework: framework.toLowerCase(),
        template: "component.component.ts",
        isTestFile: isTestFile,
        folder: folder,
        anotherComponent: anotherComponent,
    };
}
