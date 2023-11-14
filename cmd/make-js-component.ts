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

//program config and setup
program.name('make-js-component')
        .version(packageJson.version)
        .option("--vue","creates a vue component")
        .option("-c","creates a vue component using composition API: use options API instea")
        .requiredOption('-n, --name <component name>', "the name of the component")
        .option("-f, --folder <custom folder path>", "a custom folder inside components to save the component")
        .parse(process.argv)


const options = program.opts();
let usedFramework : enabledFramework = enabledFramework.Empty;
let componentName : String = "";



if(options.vue) usedFramework = enabledFramework.Vue
// add here options for the framework
if(options.name) componentName = options.name

if(usedFramework == ""){
    console.error("You must specify the framework [--vue, --react...]")
    process.exit();
}

const componentTemplate : String = options.c ? 'component-composition.vue' : 'component-options.vue'
const customFolder: String = options.folder || "";

try {
    createComponent(componentName,usedFramework,componentTemplate,customFolder);
} catch (error) {
    console.error(error)
}




function capitalizeFirstLetter(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function createComponent(componentName : String, framework: String, template: String, customFolder : String = ""){
    if(!fs.existsSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`)){
        fs.mkdirSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`);
    }
    fs.readFile(path.join(configs.INIT_PATH,'src',configs.STUBS_DIR,framework,template), 'utf8', (err: Error,data: String)=>{
        data = data.replaceAll("Component",capitalizeFirstLetter(componentName))
        if(!fs.existsSync(path.join(configs.BASE_DIR,configs.COMPONENT_FOLDER,customFolder))){
            fs.mkdirSync(path.join(configs.BASE_DIR,configs.COMPONENT_FOLDER,customFolder));
        }
        const compFileName = componentName+'.vue';
        fs.writeFile(path.join(configs.BASE_DIR,configs.COMPONENT_FOLDER,customFolder,compFileName),data, (err: Error)=>{
            if(err){
                console.error(err)
            }else{
                console.log('Done')
            }
        })
    })
}