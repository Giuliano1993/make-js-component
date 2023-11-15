#! /usr/bin/env node
var _a;
var fs = require('fs');
var path = require('node:path');
var createCommand = require("commander").createCommand;
var program = createCommand();
var packageJson = require('../package.json');
var wizard = require('../utils/wizard.js');
var mainFilename = path.dirname(((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename) || "");
var dir = path.join(mainFilename, '..');
var configs = {
    INIT_PATH: dir,
    BASE_DIR: "./src",
    STUBS_DIR: "stubs",
    COMPONENT_FOLDER: "/components",
};
var enabledFramework;
(function (enabledFramework) {
    enabledFramework["Vue"] = "vue";
    enabledFramework["React"] = "react";
})(enabledFramework || (enabledFramework = {}));
wizard();
process.abort();
//program config and setup
/*program.name('make-js-component')
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


*/
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
