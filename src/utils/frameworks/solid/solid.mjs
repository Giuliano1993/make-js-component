import createComponent from "../../utils.mjs";

export default function solidWizard(componentName, folder) {
  return createComponent(
    componentName,
    "solid",
    "component.tsx",
    folder
  );
}
