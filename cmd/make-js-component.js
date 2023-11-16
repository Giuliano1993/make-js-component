#! /usr/bin/env node
var _a;
var fs = require('fs');
var path = require('node:path');
var mainFilename = path.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename);
var dir = path.join(mainFilename, '..');
var createCommand = require("commander").createCommand;
var program = createCommand();
var packageJson = require('../package.json');
var configs = {
    INIT_PATH: dir,
    BASE_DIR: "./src",
    STUBS_DIR: "stubs",
    COMPONENT_FOLDER: "/components",
};
program
    .command("vue")
    .argument('<component name>', 'the component name')
    .option("-f, --folder <path>", "a custom folder inside components to save the component")
    .option("-c, --composition", "creates a vue component using composition API: use options API instea")
    .action(function (name, opts) {
    var componentTemplate = opts.composition ? 'component-composition.vue' : 'component-options.vue';
    var customFolder = opts.folder || "";
    try {
        createComponent(name, 'vue', componentTemplate, customFolder, Extension.vue);
    }
    catch (error) {
        console.error(error);
    }
});
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
program.parse();
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
var Extension;
(function (Extension) {
    Extension["JS"] = "js";
    Extension["JSX"] = "jsx";
    Extension["vue"] = "vue";
})(Extension || (Extension = {}));
function createComponent(componentName, framework, template, customFolder, extension) {
    if (customFolder === void 0) { customFolder = ""; }
    if (!fs.existsSync("".concat(configs.BASE_DIR).concat(configs.COMPONENT_FOLDER))) {
        fs.mkdirSync("".concat(configs.BASE_DIR).concat(configs.COMPONENT_FOLDER));
    }
    fs.readFile(path.join(configs.INIT_PATH, 'src', configs.STUBS_DIR, framework, template), 'utf8', function (err, data) {
        data = data.replaceAll("Component", capitalizeFirstLetter(componentName));
        if (!fs.existsSync(path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder))) {
            fs.mkdirSync(path.join(configs.BASE_DIR, configs.COMPONENT_FOLDER, customFolder));
        }
        var compFileName = "".concat(componentName, ".").concat(extension);
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
