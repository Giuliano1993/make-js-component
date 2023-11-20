#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const vue_1 = __importDefault(require("../src/programs/vue"));
const program = (0, commander_1.createCommand)();
(0, vue_1.default)(program);
program.parse();
