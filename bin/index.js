#!/usr/bin/env node

//const program = require('commander')
const { Command } = require('commander');
const program = new Command();

//import { create } from '../lib/create.mjs'
const create = require('../lib/create');

const { description, version } = require('../package.json')
//
program
 .description(description)
 .version(version, '-v, - version')
 
 program
    .command('create <name>') // sub-command name
    .description('create cf mta app') // command description
    .action(function (name) {
        create(name);
    });


// allow commander to parse `process.argv`
program.parse(process.argv);