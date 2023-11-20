"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils/utils"));
const prepareAngularProgram = (program) => {
    program
        .command("ng")
        .argument('<component name>', 'the component name')
        .option("-f, --folder <path>", "a custom folder inside components to save the component")
        .action((name, opts) => {
        const componentTemplate = 'component.component.js';
        const customFolder = opts.folder || "";
        try {
            (0, utils_1.default)(name, 'angular', componentTemplate, customFolder);
        }
        catch (error) {
            console.error(error);
        }
    });
};
exports.default = prepareAngularProgram;
