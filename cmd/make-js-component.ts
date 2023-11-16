#! /usr/bin/env node
const fs = require('fs')
const path = require('node:path');
const mainFilename = path.dirname(require.main?.filename)
const dir = path.join(mainFilename,'..');
const {createCommand} = require("commander");
const program = createCommand();
const packageJson = require('../package.json');

const configs = {
    INIT_PATH: dir,
    BASE_DIR: "./src",
    STUBS_DIR: "stubs",
    COMPONENT_FOLDER: "/components",
}



program
    .command("vue")
    .argument('<component name>','the component name')
    .option("-f, --folder <path>", "a custom folder inside components to save the component")
    .option("-c, --composition","creates a vue component using composition API: use options API instea")
    .action((name:string, opts:{
        folder: string,
        composition: boolean
    })=>{
        const componentTemplate : String = opts.composition ? 'component-composition.vue' : 'component-options.vue'
        const customFolder: String = opts.folder || "";

        try {
            createComponent(name,'vue',componentTemplate,customFolder);
        } catch (error) {
            console.error(error)
        }
    })

// To be added soon
/*program
    .command("react")
    .argument('<component name>','the component name')
    .option("-f, --folder <path>", "a custom folder inside components to save the component")
    .option("-t, --typescript","uses typescript")
    .action((message:string, opts:{
        folder: string,
        typescript: boolean
    })=>{
        console.log(message, opts)
    })*/
program.parse()




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