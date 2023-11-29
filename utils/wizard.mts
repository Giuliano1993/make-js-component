import inquirer from "inquirer";

type Answers = {
  componentName: string;
  framework: string;
  template: string;
  folder: string;
};
const wizard = async () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "componentName",
        message: "Give a name to your component",
        validate: (input) => {
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
      },
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
        choices: ["Vue", "Angular", "React"],
      },
    ])
    .then(
      (answers: {
        componentName: string;
        folder: string;
        framework: string;
      }) => {
        const { componentName, framework, folder } = answers;
        if (framework === "Vue") {
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
                framework: framework,
                template:
                  answers.api === "Composition API"
                    ? "component-composition.vue"
                    : "component-options.vue",
                folder: folder,
              };
            });
        } else if (framework === "Angular") {
          return {
            componentName: componentName,
            framework: framework,
            template: "component.component.js",
            folder: answers.folder,
          };
        } else if (framework === "React") {
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
                framework: framework,
                template: answers.typescript
                  ? "function-component.tsx"
                  : "function-component.jsx",
                folder: folder,
              };
            });
        } else {
          throw new Error("a framework must be selected");
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
