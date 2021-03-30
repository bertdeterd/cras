#!/usr/bin/env node

const { Command } = require('commander');
const fiori = require('../lib/fiori/fiori');
const { description, version } = require('../package.json')
const inquirer = require('inquirer');

const program = new Command();

program
    .description(description)
    .version(version, '-v, - version')

program
    .command('fiori')
    .description('create cf mta app fiori style')
    .action((appname) => {

        var questions = [
            {
                type: 'input',
                name: 'appname',
                message: "Application Name",
            },
            {
                type: 'input',
                name: 'appid',
                message: "Unique Technical Application ID (max 3 char.)",
                validate: function (value) {
                    var pass = value.match(/^[a-z]{2,3}$/i);
                    if (pass) {
                      return true;
                    }
                    return 'Please enter a short ID (max 3 characters)';
                  },
            }
        ];

        inquirer.prompt(questions).then((answers) => {
            //console.log(JSON.stringify(answers, null, '  '));
            fiori(answers);
        });



    });

program.parse(process.argv);