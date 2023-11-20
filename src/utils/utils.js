"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("node:path"));
const configs_1 = __importDefault(require("../configs"));
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const createComponent = (componentName, framework, template, customFolder = "") => {
    if (!fs.existsSync(`${configs_1.default.BASE_DIR}${configs_1.default.COMPONENT_FOLDER}`)) {
        fs.mkdirSync(`${configs_1.default.BASE_DIR}${configs_1.default.COMPONENT_FOLDER}`);
    }
    fs.readFile(path.join(configs_1.default.INIT_PATH, 'src', configs_1.default.STUBS_DIR, framework, template), 'utf8', (err, data) => {
        data = data.replaceAll("Component", capitalizeFirstLetter(componentName));
        if (!fs.existsSync(path.join(configs_1.default.BASE_DIR, configs_1.default.COMPONENT_FOLDER, customFolder))) {
            fs.mkdirSync(path.join(configs_1.default.BASE_DIR, configs_1.default.COMPONENT_FOLDER, customFolder));
        }
        const extension = path.extname(template);
        const compFileName = `${componentName}${extension}`;
        fs.writeFile(path.join(configs_1.default.BASE_DIR, configs_1.default.COMPONENT_FOLDER, customFolder, compFileName), data, (err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log('Done');
            }
        });
    });
};
exports.default = createComponent;
