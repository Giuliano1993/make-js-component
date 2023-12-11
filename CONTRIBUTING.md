## Issues & Pull Requests

- [Issues \& Pull Requests](#issues--pull-requests)
  - [Getting started locally](#getting-started-locally)
  - [Creating an Issue](#creating-an-issue)
  - [Working on an Issue](#working-on-an-issue)
  - [Pull requests](#pull-requests)
- [Adding a New Framework](#adding-a-new-framework)

### Getting started locally

1. Clone the repo
2. In the repo folder run `npm run dev`; this will start watching ts files and transpile them to js
3. Now you can run locally the command: just type `npx .` in your terminal to execut it

### Creating an Issue

Before **creating** an Issue please follow these steps:

1. search existing Issues before creating a new issue (has someone raised this already)
2. if it doesn't exist create a new issue giving as much context as possible
3. if you wish to work on the Issue please check the relative checkbox

### Working on an Issue

Before working on an existing Issue please follow these steps:

1. comment asking for the issue to be assigned to you
2. after the Issue is assigned to you, you can start working on it
3. **only** start working on this Issue (and open a Pull Request) when it has been assigned to you.
4. when forking the issue, create a branch for your edits
5. before pushing run `npx @biomejs/biome ci .` to be sure that code formatting is correct and it will pass the PR workflow
6. reference the Issue in your Pull Request (for example `closes #123`)
7. please do **not** force push to your PR branch, this makes it very difficult to re-review - commits will be squashed when merged

### Pull requests

Remember, before opening a PR, to have an issue assigned to work on! If you have an idea but you don't find any issue for it, first open an issue and ask to have it assigned! This way you don't risk to work on something which is already being worked on or that isn't needed right now!
When the issue is assigned to you, you're welcome to start working on it, I'll be glad to merge it!

## Adding a New Framework

Missing your favorite js framework? You can add it!

1. **Modify the Wizard:**

   - Create a file `.mts` for the framework inside the `src/utils/frameworks/{frameworkname}` folder.
     It should import `inquirer` and export a function that take `componentName` and `folder` as parameters.
     Here you can add some eventual extra questions specifics to this framework. Check the existing framework files as an example
   - Open the `wizard.mts`.
   - Import the file you previously created
   - Add the framework name to the `frameworks` array
   - Add the framework to the `switch-case`

2. **Create Stubs:**

   - Create a folder with the framework name insiede the `src/stubs` folder
   - Inside the folder add add as many files as the options made available by the wizard
   - Add templates for the new framework. These will serve as the initial structure for a component of that framework.

3. **Test the Command:**

   - Run the command with the new framework to ensure that it works as expected.

4. **Update Documentation:**
   - Add a new section in the README.md file under "Available Frameworks" to provide information about the newly added framework.
   - Include any specific instructions or choices related to the new framework or open an issue for this purpouse.
