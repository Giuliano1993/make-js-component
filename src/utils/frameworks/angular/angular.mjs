const framework = "angular";
export default function (componentName, folder, testFile) {
    return {
        componentName: componentName,
        framework: framework.toLowerCase(),
        template: "component.component.ts",
        testFile: testFile,
        folder: folder,
    };
}
