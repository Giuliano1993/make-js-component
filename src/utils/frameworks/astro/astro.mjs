const framework = "astro";
export default function (componentName, folder) {
  return {
    componentName: componentName,
    framework: framework.toLowerCase(),
    template: "component.astro",
    folder: folder,
  };
}
