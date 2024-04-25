const framework = "angular";

export default function (componentName, folder) {
  return {
    componentName,
    framework: framework.toLowerCase(),
    template: "component.component.ts",
    folder: folder,
  };
}
