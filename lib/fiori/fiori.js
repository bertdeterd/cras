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

    //create main folder and subdir app folder
    const winmtadir = `${WIN_CURR_DIR}\\${appname}`
    fs.mkdirSync(winmtadir)
    fs.mkdirSync(`${winmtadir}\\app`)

    //copy template to main folder
    fs.copySync(NODE_TMPL_MTA_DIR, winmtadir)

    //change vars in files
    helper.changeFileVariables(`${WIN_CURR_DIR}\\${appname}\\package.json`, { appname: appname, appid: appid })
    helper.changeFileVariables(`${WIN_CURR_DIR}\\${appname}\\xs-security.json`, { appname: appname })
    helper.changeFileVariables(`${WIN_CURR_DIR}\\${appname}\\mta.yaml`, { appid: appid, appname: appname })

    //create react app
    process.chdir(`${WIN_CURR_DIR}\\${appname}\\app`)

    
    console.log(`Your OS is ${process.platform}`)
    const npxcmd = (process.platform === 'win32')?'npx.cmd':'npx'; 
    const reactscript = cp.spawn(`${npxcmd}`, [ `create-react-app`, `${appname}app`, `--template`, `cra-template-btp`], { stdio: 'inherit'});
    reactscript.on('close', (code) => { 
        helper.changeFileVariables(`${WIN_CURR_DIR}\\${appname}\\app\\${appname}app\\public\\manifest.json`, { appid: appid, appname: appname })
        console.log('React App Created!\n');
        console.log('Next steps'.green)
        console.log('1. Change dev server setting in setupProxy.js to your SAP development server'.blue)
        console.log('2. Change destination in public/xs-app.json to your destination (see Cockpit which destinations are available for you!)'.blue)
       
    });

};