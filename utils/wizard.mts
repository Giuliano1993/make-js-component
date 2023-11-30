import inquirer from "inquirer";
import { Command } from "commander";
const program = new Command();

type Answers = {
  componentName: string;
  framework: string;
  template: string;
  folder: string;
};

const AVAILABLE_CHOICES = Object.freeze({
  VUE: "Vue",
  ANGULAR: "Angular",
  REACT: "React",
});

function generateReactComponent(
  componentName: string,
  folder: string
): Promise<Answers> {
  return inquirer
    .prompt([
      {
        type: "confirm",
        name: "typescript",
        message: "Do you want to use Typescript?",
        default: true,
      },
    ])
    .then((answers: { typescript: boolean }) => {
      return {
        componentName: componentName,
        framework: AVAILABLE_CHOICES.REACT.toLowerCase(),
        template: answers.typescript
          ? "function-component.tsx"
          : "function-component.jsx",
        folder: folder,
      };
    });
}

function generateAngularComponent(
  componentName: string,
  folder: string
): Answers {
  return {
    componentName: componentName,
    framework: AVAILABLE_CHOICES.ANGULAR.toLowerCase(),
    template: "component.component.js",
    folder: folder,
  };
}

function generateVueComponent(
  componentName: string,
  folder: string
): Promise<Answers> {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "api",
        message: "Choose wich api to use",
        choices: ["Composition API", "Options API"],
      },
    ])
    .then((answers: { api: string }) => {
      return {
        componentName: componentName,
        framework: AVAILABLE_CHOICES.VUE.toLowerCase(),
        template:
          answers.api === "Composition API"
            ? "component-composition.vue"
            : "component-options.vue",
        folder: folder,
      };
    });
}
const wizard = async () => {
  // Parse command line arguments using commander
  program.option("--name <value>", "Specify a name").parse(process.argv);

  const options = program.opts();
  const componentNameFromFlag = options.name || "";

  const prompts = [];

  // Only ask for componentName if --name argument is not provided
  if (!componentNameFromFlag) {
    prompts.push({
      type: "input",
      name: "componentName",
      message: "Give a name to your component",
      validate: (input: string) => {
        const trimmedInput = input.trim();
        if (trimmedInput === "") {
          return "Component name cannot be empty";
        }
        // Use a regular expression to check for only alphanumeric characters
        const isValid = /^[a-zA-Z0-9]+$/.test(trimmedInput);
        return isValid
          ? true
          : "Component name can only contain alphanumeric characters";
      },
    });
  }

  prompts.push(
    {
      type: "input",
      name: "folder",
      message:
        "Custom path under the component folder for saving your component",
      default: "",
    },
    {
      type: "list",
      name: "framework",
      message: "Pick a framework to create the component for",
      choices: Object.values(AVAILABLE_CHOICES),
    }
  );

  return inquirer
    .prompt(prompts)
    .then(
      (answers: {
        componentName: string;
        folder: string;
        framework: string;
      }) => {
        const { framework, folder } = answers;
        const componentName = answers.componentName || componentNameFromFlag;
        switch (framework) {
          case AVAILABLE_CHOICES.VUE:
            return generateVueComponent(componentName, folder);
          case AVAILABLE_CHOICES.ANGULAR:
            return generateAngularComponent(componentName, folder);
          case AVAILABLE_CHOICES.REACT:
            return generateReactComponent(componentName, folder);
          default:
            throw new Error("A framework must be selected");
        }
      }
    )
    .then<Answers>((values: Answers | PromiseLike<Answers>) => {
      return values;
    })
    .catch((e: Error) => {
      throw new Error(e.message);
    });
};
export default wizard;
