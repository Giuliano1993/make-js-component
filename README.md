# Make Js Component
This package is born from the idea to expand the previous [make-vue-component](https://github.com/Giuliano1993/make-vue-component) command and to make it available also for other front-end frameworks, in order to improve the developer experience when writing your components.

- [Make Js Component](#make-js-component)
  - [Basic Usage](#basic-usage)
  - [Options](#options)
      - [-n --name `REQUIRED`](#-n---name-required)
      - [--\[frameworkname\] `REQUIRED`](#--frameworkname-required)
      - [-c (Vue components Only)](#-c-vue-components-only)
      - [-f --folder](#-f---folder)
  - [Contributing](#contributing)
    - [Open issue](#open-issue)
    - [Pull Request](#pull-request)


## Basic Usage

```bash
npx make-js-component --name <component-name> --[framework name]
```

For example:

```bash
npx make-js-component --name my-great-component --vue
```


## Options

#### -n --name `REQUIRED`

The name of the component you want to create


#### --[frameworkname] `REQUIRED`

The framework you want to create the component for.

For the moment we have: `--vue`
More to come, any contribution is welcome


#### -c (Vue components Only)

If creating a Vue Comonent, it will use the composition API, defaults on Option API

#### -f --folder

Select a custom nested folder inside src/components 


## Contributing
Every contribution is more than welcome

### Open issue
If you find any issue please open it and explain clearly what's the problem giving also some context indication; ideas for enhancements are also welcome.

### Pull Request
You can ask to have an issue assigned and work on it. I will merge the pull requests related to an issue, so first have it assigned and then work on the code

When forking, work on a separate branch not on main


