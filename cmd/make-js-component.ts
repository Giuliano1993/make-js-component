#! /usr/bin/env node
const fs = require('fs')
const path = require('node:path');
const mainFilename = path.dirname(require.main?.filename)
const dir = path.join(mainFilename,'..');
const {createCommand} = require("commander");
const program = createCommand();
const packageJson = require('../package.json');

const configsProd = {
    INIT_PATH: dir,
    BASE_DIR: "./src",
    STUBS_DIR: "stubs",
    COMPONENT_FOLDER: "/components",
}

const configTest = {
    INIT_PATH: process.env.INIT_CWD,
    BASE_DIR: "./src",
    STUBS_DIR: "stubs",
    COMPONENT_FOLDER: "/components"
}

const configs = configTest

enum enabledFramework {
    Empty = "",
    Vue = "vue",
    React = "react"
}


program.name('make-js-component').version(packageJson.version);
program.option("--vue","creates a vue component")
program.option("-c","creates a vue component using composition API: use options API instea")
program.requiredOption('-n, --name <component name>', "the name of the component")
let usedFramework : enabledFramework = enabledFramework.Empty;
let componentName : String = "";
program.parse(process.argv)
const options = program.opts();
console.log(options)
if(options.vue) usedFramework = enabledFramework.Vue
// add here more options
if(options.name) componentName = options.name

if(usedFramework == ""){
    console.error("You must specify the framework [--vue, --react...]")
    process.exit();
}

const componentTemplate = options.c ? 'component-composition.vue' : 'component-options.vue'

try {
     
    const folderArgIndex = process.argv.indexOf('--f')
    let customFolder = folderArgIndex > -1 ? process.argv[folderArgIndex+1] : '';
    customFolder = customFolder.charAt(-1) == '/' ? customFolder : `${customFolder}/`
    customFolder = customFolder.charAt(0) == '/' ? customFolder : `/${customFolder}`
    
    if(!fs.existsSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`)){
        fs.mkdirSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`);
    }
    console.log(path.join(configs.INIT_PATH,'src',configs.STUBS_DIR,usedFramework,componentTemplate))
    fs.readFile(path.join(configs.INIT_PATH,'src',configs.STUBS_DIR,usedFramework,componentTemplate), 'utf8', (err: Error,data: String)=>{
        data = data.replaceAll("Component",capitalizeFirstLetter(componentName))
        if(!fs.existsSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}${customFolder}`)){
            fs.mkdirSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}${customFolder}`);
        }
        fs.writeFile(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}${customFolder}${componentName}.vue`,data, (err: Error)=>{
            if(err){
                console.error(err)
            }else{
                console.log('Done')
            }
        })
    })
} catch (error) {
    console.error(error)
}




function capitalizeFirstLetter(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}