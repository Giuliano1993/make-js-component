[![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=Giuliano1993&name=make-js-component)](https://repo-rater.eddiehub.io/rate?owner=Giuliano1993&name=make-js-component)

<p align="center">
   <img src="https://github.com/Giuliano1993/make-js-component/assets/12759050/bedcd81f-431b-4699-9771-ba5c237ec68f" />
</p>

# Make Js Component

Make Js Component is an NPX command born with the purpose of streamline the process for developers of creating components with the many FE frameworks around here.

Since some frameworks have standard commands, some had them, some really don't, the quickest thing is usually copy pasting compononent after component and then edit it.

MJC allows you to just call a command and have your JS component ready to use, and edit, with also a bunch of options available in order to start with the perfect boilerplate.

You can't find the framework or the options you need? Checkout the [Contributing guide](./CONTRIBUTING.md) and open an issue to let us know and, if you wish, you can open a PR to have the feature inclued in the command!

- [Make Js Component](#make-js-component)
  - [Basic Usage](#basic-usage)
    - [Options](#options)
      - [--name](#--name)
      - [--folder](#--folder)
      - [--framework](#--framework)
      - [--\[framework\]](#--framework-1)
  - [Available Frameworks](#available-frameworks)
    - [Vue](#vue)
    - [React](#react)
    - [Angular](#angular)
    - [Qwik](#qwik)
    - [Svelte](#svelte)
    - [Astro](#astro)
  - [Contributing](#contributing)
  - [Setup locally](#setup-locally)

## Basic Usage

```bash
npx make-js-component
```

This will run a short wizard so you can easily create your component in few steps

### Options

#### --name

Specify the component name

```bash
npx make-js-component --name <NAME>
```

#### --folder

Set the /components subfolder in which create the new component

```bash
npx make-js-component --folder <PATH>
```

#### --framework

Set which framework is your component for:

```bash
npx make-js-component --framework [vue|angular|react|svelte|qwik|astro]
```

#### --[framework]

More briefly you can specify directly the desired framework as a flag. The available flags are the same as the options for --framework flag

```bash
#this will create a vue component
npx make-js-component --vue
```

## Available Frameworks

### Vue
> Want to help with vue components? Check out [Vue related issues](https://github.com/Giuliano1993/make-js-component/issues?q=is%3Aissue+is%3Aopen+label%3AVue)

When choosing Vue, the wizard will ask you whether you prefer to use the **Options API** or the **Composition API**, and you can make your selection using the arrow keys.

### React
> Want to help with React components? Check out [React related issues](https://github.com/Giuliano1993/make-js-component/issues?q=is%3Aissue+is%3Aopen+label%3AReact)

When choosing React, the wizard will ask you if you want to use **TypeScript** or not, and you can make your selection using the arrow keys.

### Angular
> Want to help with Angular components? Check out [Angular related issues](https://github.com/Giuliano1993/make-js-component/issues?q=is%3Aissue+is%3Aopen+label%3AAngular)

### Qwik
> Want to help with Qwik components? Check out [Qwik related issues](https://github.com/Giuliano1993/make-js-component/issues?q=is%3Aissue+is%3Aopen+label%3AQwik)

### Svelte
> Want to help with Svelte components? Check out [Svelte related issues](https://github.com/Giuliano1993/make-js-component/issues?q=is%3Aissue+is%3Aopen+label%3ASvelte)

### Astro
> Want to help with Astro components? Check out [Astro related issues](https://github.com/Giuliano1993/make-js-component/issues?q=is%3Aissue+is%3Aopen+label%3AAstro)

## Contributing

Read the [Contributing guide](./CONTRIBUTING.md) for the contribution process

## Setup locally

If you're cloning the repo, both for contributing or just to start taking confidence with the code just follow these steps:

1. clone the repo with `git clone https://github.com/Giuliano1993/make-js-component`
2. inside the folder run `npm install`
3. then to transpile ts files into js and watch them,  run `npm run dev`

To run your local version of the package and test it, run 

```bash
npx .
```
