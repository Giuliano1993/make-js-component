#! /usr/bin/env node

import * as fs from 'fs';
import * as path from "node:path";
import { Command, createCommand } from 'commander';

import prepareVueProgram from '../src/programs/vue';
import prepareAngularProgram from '../src/programs/angular';


const program = createCommand();

prepareVueProgram(program)
prepareAngularProgram(program)

program.parse()

