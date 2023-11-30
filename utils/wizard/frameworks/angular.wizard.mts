import { Answers } from "../../../types/index.mjs";


const angularWizard = (componentName: string, folder: string): Answers | PromiseLike<Answers> => {
    return {
        componentName,
        folder,
        framework: "angular",
        template: "component.component.js",
      };
}

export default angularWizard;