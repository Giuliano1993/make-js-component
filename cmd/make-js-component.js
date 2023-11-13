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
program.name('make-js-component').version(packageJson.version);
program.option("--vue", "creates a vue component");
program.option("-c", "creates a vue component using composition API: use options API instea");
program.requiredOption('-n, --name <component name>', "the name of the component");
var usedFramework = enabledFramework.Empty;
var componentName = "";
program.parse(process.argv);
var options = program.opts();
console.log(options);
if (options.vue)
    usedFramework = enabledFramework.Vue;
// add here more options
if (options.name)
    componentName = options.name;
if (usedFramework == "") {
    console.error("You must specify the framework [--vue, --react...]");
    process.exit();
}
var componentTemplate = options.c ? 'component-composition.vue' : 'component-options.vue';
try {
    var folderArgIndex = process.argv.indexOf('--f');
    var customFolder_1 = folderArgIndex > -1 ? process.argv[folderArgIndex + 1] : '';
    customFolder_1 = customFolder_1.charAt(-1) == '/' ? customFolder_1 : "".concat(customFolder_1, "/");
    customFolder_1 = customFolder_1.charAt(0) == '/' ? customFolder_1 : "/".concat(customFolder_1);
    if (!fs.existsSync("".concat(configs.BASE_DIR).concat(configs.COMPONENT_FOLDER))) {
        fs.mkdirSync("".concat(configs.BASE_DIR).concat(configs.COMPONENT_FOLDER));
    }
    console.log(path.join(configs.INIT_PATH, 'src', configs.STUBS_DIR, usedFramework, componentTemplate));
    fs.readFile(path.join(configs.INIT_PATH, 'src', configs.STUBS_DIR, usedFramework, componentTemplate), 'utf8', function (err, data) {
        data = data.replaceAll("Component", capitalizeFirstLetter(componentName));
        if (!fs.existsSync("".concat(configs.BASE_DIR).concat(configs.COMPONENT_FOLDER).concat(customFolder_1))) {
            fs.mkdirSync("".concat(configs.BASE_DIR).concat(configs.COMPONENT_FOLDER).concat(customFolder_1));
        }
        fs.writeFile("".concat(configs.BASE_DIR).concat(configs.COMPONENT_FOLDER).concat(customFolder_1).concat(componentName, ".vue"), data, function (err) {
            if (err) {
                console.error(err);
            }
            else {
                console.log('Done');
            }
        });
    });
}
catch (error) {
    console.error(error);
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
