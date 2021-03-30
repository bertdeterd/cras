#!/usr/bin/env node

const { Command } = require('commander');
const fiori = require('../lib/fiori/fiori');
const { description, version } = require('../package.json')

const program = new Command();

program
 .description(description)
 .version(version, '-v, - version')
 
 program
    .command('fiori <appname>') 
    .description('create cf mta app fiori style') 
    .action( (appname) => {
        fiori(appname);
    });

program.parse(process.argv);