const ejs = require('ejs')
const cp = require("child_process");
const fs = require("fs-extra")
const path = require('path')
const settings = require('./utils/settings')
var colors = require('colors');
const helper = require('./utils/helpers')
const inquirer = require('inquirer');

module.exports = function (answers) {

    const appname = answers.appname;
    const appid = answers.appid;
    
    //general
    const WIN_CURR_DIR = process.cwd();
    const NODE_TMPL_MTA_DIR = path.join(__dirname, 'template\\mta')

    //create main folder
    const winmtadir = `${WIN_CURR_DIR}\\${appname}`
    fs.mkdirSync(winmtadir)

    //copy template to main folder
    fs.copySync(NODE_TMPL_MTA_DIR, winmtadir)

    //change vars in files
    helper.changeFileVariables(`${WIN_CURR_DIR}\\${appname}\\package.json`, { appname: appname, appid: appid })
    helper.changeFileVariables(`${WIN_CURR_DIR}\\${appname}\\xs-security.json`, { appname: appname })
    helper.changeFileVariables(`${WIN_CURR_DIR}\\${appname}\\mta.yaml`, { appid: appid, appname: appname })

    //create react app
    process.chdir(`${WIN_CURR_DIR}\\${appname}\\app`)
   
    const reactscript = cp.exec(`npx create-react-app ${appname}app --template cra-template-btp`);
    reactscript.stdout.on('data', (data) => {
        console.log(data);
    });
    reactscript.stderr.on('data', (data) => {
        console.error(data);
    });
    reactscript.on('close', (code) => {
        console.log('React App Created!');
        console.log('Change dev server in setupProxy.js to your SAP development server')
        helper.changeFileVariables(`${WIN_CURR_DIR}\\${appname}\\app\\${appname}app\\public\\manifest.json`, { appid: appid, appname: appname })
    });

};