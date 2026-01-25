import { Command } from "commander";
import inquirer from "inquirer";
import alpineWizard from "./frameworks/alpine/alpine.mjs";
import angularWizard from "./frameworks/angular/angular.mjs";
import astroWizard from "./frameworks/astro/astro.mjs";
import mitosisWizard from "./frameworks/mitosis/mitosis.mjs";
import qwikWizard from "./frameworks/qwik/qwik.mjs";
import preactWizard from "./frameworks/preact/preact.mjs";
import reactWizard from "./frameworks/react/react.mjs";
import solidWizard from "./frameworks/solid/solid.mjs";
import stencilWizard from "./frameworks/stencil/stencil.mjs";
import svelteWizard from "./frameworks/svelte/svelte.mjs";
import vueWizard from "./frameworks/vue/vue.mjs";
import { capitalizeFirstLetter } from "./utils.mjs";
const program = new Command();
const wizard = async () => {
  // Parse command line arguments using commander
  const frameworks = ["Vue", "Angular", "React", "Preact", "Solid", "Svelte", "Qwik", "Astro", "Alpine", "Stencil", "Mitosis"];
  program
    .option("--name <value>", "Specify a name")
    .option(
      "-f, --framework <value>",
      `Specify framework [${frameworks.join("|")}]`
    )
    .option("--vue", "Create a Vue component")
    .option("--angular", "Create an Angular component")
    .option("--react", "Create a React component")
    .option("--preact", "Create a Preact component")
    .option("--solid", "Create a Solid component")
    .option("--svelte", "Create a Svelte component")
    .option("--qwik", "Create a Qwik component")
    .option("--astro", "Create an Astro component")
    .option("--alpine", "Create an Alpine component")
    .option("--stencil", "Create a Stencil component")
    .option("--mitosis", "Create a Mitosis component")
    .option("--folder <value>", "Specify the subfolder")
    .option("--multiple", "Creating multiple components at once")
    .parse(process.argv);
  const options = program.opts();
  const componentNameFromFlag = options.name || "";
  const frameworkFromFlag =
    options.vue
      ? "vue"
      : options.angular
      ? "angular"
      : options.react
      ? "react"
      : options.preact
      ? "preact"
      : options.solid
      ? "solid"
      : options.svelte
      ? "svelte"
      : options.qwik
      ? "qwik"
      : options.astro
      ? "astro"
      : options.alpine
      ? "alpine"
      : options.stencil
      ? "stencil"
      : options.mitosis
      ? "mitosis"
      : options.framework || "";
  const folderFromFlag = options.folder || "";
  const multipleFromFlag = options.multiple || false;

  const prompts = [];
  // Only ask for componentName if --name argument is not provided
  if (!componentNameFromFlag) {
    prompts.push({
      type: "input",
      name: "componentName",
      message: "Give a name to your component",
      validate: (input) => {
        const trimmedInput = input.trim();
        if (trimmedInput === "") {
          return "Component name cannot be empty";
        }
        if (multipleFromFlag && trimmedInput === "exit") {
          process.exit();
        }
        // Use a regular expression to check for only alphanumeric characters
        const isValid = /^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/.test(trimmedInput);
        return (
          isValid || "Component name can only contain alphanumeric characters"
        );
      },
    });
  }
  if (!folderFromFlag) {
    prompts.push({
      type: "input",
      name: "folder",
      message: "Custom path for the component (default: src/components)",
      default: "",
    });
  }
  if (!frameworkFromFlag) {
    prompts.push({
      type: "list",
      name: "framework",
      message: "Pick a framework to create the component for",
      choices: frameworks,
    });
  }

  return inquirer
    .prompt(prompts)
    .then((answers) => {
      const folder = answers.folder || folderFromFlag;
      const framework =
        answers.framework || capitalizeFirstLetter(frameworkFromFlag);
      const componentName = answers.componentName || componentNameFromFlag;
      switch (framework) {
        case "Vue":
          return vueWizard(componentName, folder);
        case "Angular":
          return angularWizard(componentName, folder);
        case "React":
          return reactWizard(componentName, folder);
        case "Preact":
          return preactWizard(componentName, folder);
        case "Solid":
          return solidWizard(componentName, folder);
        case "Svelte":
          return svelteWizard(componentName, folder);
        case "Qwik":
          return qwikWizard(componentName, folder);
        case "Astro":
          return astroWizard(componentName, folder);
        case "Alpine":
          return alpineWizard(componentName, folder);
        case "Stencil":
          return stencilWizard(componentName, folder);
        case "Mitosis":
          return mitosisWizard(componentName, folder);
        default:
          throw new Error("A valid framework must be selected");
      }
    })
    .then((values) => {
      if (!multipleFromFlag) {
        return inquirer
          .prompt([
            {
              type: "confirm",
              name: "anotherComponent",
              message: "Do you want to create another component?",
              default: false,
            },
          ])
          .then((answers) => {
            const { anotherComponent } = answers;
            const completeValues = {
              ...values,
              anotherComponent: anotherComponent,
            };
            return completeValues;
          });
      }
      return { ...values, anotherComponent: true };
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};
export default wizard;
