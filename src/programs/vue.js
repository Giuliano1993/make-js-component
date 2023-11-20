"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils/utils"));
const prepareVueProgram = (program) => {
    program
        .command("vue")
        .argument('<component name>', 'the component name')
        .option("-f, --folder <path>", "a custom folder inside components to save the component")
        .option("-c, --composition", "creates a vue component using composition API: use options API instea")
        .action((name, opts) => {
        const componentTemplate = opts.composition ? 'component-composition.vue' : 'component-options.vue';
        const customFolder = opts.folder || "";
        try {
            (0, utils_1.default)(name, 'vue', componentTemplate, customFolder);
        }
        catch (error) {
            console.error(error);
        }
    });
};
exports.default = prepareVueProgram;
