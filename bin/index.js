#!/usr/bin/env node

const { Command } = require('commander');
const fiori = require('../lib/fiori/fiori');
const { description, version } = require('../package.json')

const program = new Command();

program
 .description(description)
 .version(version, '-v, - version')
 
 program
    .command('fiori') 
    .description('create cf mta app fiori style') 
    .action( () => {
        fiori();
    });

program.parse(process.argv);