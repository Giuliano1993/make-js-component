# Make Js Component
This package is born from the idea to expand the previous [make-vue-component](https://github.com/Giuliano1993/make-vue-component) command and to make it available also for other front-end frameworks, in order to improve the developer experience when writing your components.

- [Make Js Component](#make-js-component)
  - [Basic Usage](#basic-usage)
  - [Frameworks](#frameworks)
  - [Vue](#vue)
    - [Arguments \& Options](#arguments--options)
      - [Component-name `REQUIRED`](#component-name-required)
      - [-c](#-c)
      - [-f --folder](#-f---folder)
  - [Angular](#angular)
    - [Arguments \& Options](#arguments--options-1)
      - [Component-name `REQUIRED`](#component-name-required-1)
      - [-c](#-c-1)
  - [Contributing](#contributing)
    - [Open issue](#open-issue)
    - [Pull Request](#pull-request)


## Basic Usage

```bash
npx make-js-component [framework name] <component-name> 
```

For example:

```bash
npx make-js-component vue my-great-component
```

## Frameworks
Many frameworks are going to be implemented; for each you'll have some options to generate the component how it suits you best

## Vue
Creates a vue component
  
### Arguments & Options

    
#### Component-name `REQUIRED`
The name of the component you want to create


#### -c 
If creating a Vue Comonent, it will use the composition API, defaults on Option API

#### -f --folder
Select a custom nested folder inside src/components 


## Angular
Creates a angular component
  
### Arguments & Options

    
#### Component-name `REQUIRED`
The name of the component you want to create


#### -c 
If creating a Vue Comonent, it will use the composition API, defaults on Option API



## Contributing
Every contribution is more than welcome

### Open issue
If you find any issue please open it and explain clearly what's the problem giving also some context indication; ideas for enhancements are also welcome.

### Pull Request
You can ask to have an issue assigned and work on it. I will merge the pull requests related to an issue, so first have it assigned and then work on the code

When forking, work on a separate branch not on main


