export default function solidWizard(componentName, folder) {
  return {
    componentName,
    framework: "solid",
    template: "component.tsx",
    folder,
  };
}
