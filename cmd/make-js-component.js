#! /usr/bin/env node
var _a;
var fs = require('fs');
var path = require('node:path');
var mainFilename = path.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename);
var dir = path.join(mainFilename, '..');
var createCommand = require("commander").createCommand;
var program = createCommand();
var packageJson = require('../package.json');
var configsProd = {
    INIT_PATH: dir,
    BASE_DIR: "./src",
    STUBS_DIR: "stubs",
    COMPONENT_FOLDER: "/components",
};
var configTest = {
    INIT_PATH: process.env.INIT_CWD,
    BASE_DIR: "./src",
    STUBS_DIR: "stubs",
    COMPONENT_FOLDER: "/components"
};
var configs = configTest;
var enabledFramework;
(function (enabledFramework) {
    enabledFramework["Empty"] = "";
    enabledFramework["Vue"] = "vue";
    enabledFramework["React"] = "react";
})(enabledFramework || (enabledFramework = {}));
//program config and setup
program.name('make-js-component')
    .version(packageJson.version)
    .option("--vue", "creates a vue component")
    .option("-c", "creates a vue component using composition API: use options API instea")
    .requiredOption('-n, --name <component name>', "the name of the component")
    .option("-f, --folder <custom folder path>", "a custom folder inside components to save the component")
    .parse(process.argv);
var options = program.opts();
var usedFramework = enabledFramework.Empty;
var componentName = "";
if (options.vue)
    usedFramework = enabledFramework.Vue;
// add here options for the framework
if (options.name)
    componentName = options.name;
if (usedFramework == "") {
    console.error("You must specify the framework [--vue, --react...]");
    process.exit();
}
var componentTemplate = options.c ? 'component-composition.vue' : 'component-options.vue';
try {
    var customFolder = options.folder || "";
    createComponent(componentName, usedFramework, componentTemplate, customFolder);
    /*if(!fs.existsSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`)){
        fs.mkdirSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`);
    }
    fs.readFile(path.join(configs.INIT_PATH,'src',configs.STUBS_DIR,usedFramework,componentTemplate), 'utf8', (err: Error,data: String)=>{
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
    })*/
}
catch (error) {
    console.error(error);
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function createComponent(componentName, framework, template, customFolder) {
    if (customFolder === void 0) { customFolder = ""; }
    if (!fs.existsSync("".concat(configs.BASE_DIR).concat(configs.COMPONENT_FOLDER))) {
        fs.mkdirSync("".concat(configs.BASE_DIR).concat(configs.COMPONENT_FOLDER));
    }
    fs.readFile(path.join(configs.INIT_PATH, 'src', configs.STUBS_DIR, framework, template), 'utf8', function (err, data) {
        data = data.replaceAll("Component", capitalizeFirstLetter(componentName));
        if (!fs.existsSync(path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder))) {
            fs.mkdirSync(path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder));
        }
        var compFileName = componentName + '.vue';
        fs.writeFile(path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder, compFileName), data, function (err) {
            if (err) {
                console.error(err);
            }
            else {
                console.log('Done');
            }
        });
    });
}
