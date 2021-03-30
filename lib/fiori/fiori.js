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
    console.log(`Current working directory: ${WIN_CURR_DIR} `)
    const NODE_TMPL_MTA_DIR = path.join(__dirname, 'template\\mta')

    //create main folder
    const winmtadir = `${WIN_CURR_DIR}\\${appname}`
    fs.mkdirSync(winmtadir)

    //copy template to main folder
    fs.copySync(NODE_TMPL_MTA_DIR, winmtadir)

    //change vars in files
    helper.changeFileVariables(`${WIN_CURR_DIR}\\${appname}\\package.json`, { appname: appname })
    helper.changeFileVariables(`${WIN_CURR_DIR}\\${appname}\\xs-security.json`, { appname: appname })
    helper.changeFileVariables(`${WIN_CURR_DIR}\\${appname}\\mta.yaml`, { appid: appid })

    //create react app
    process.chdir(`${WIN_CURR_DIR}\\${appname}\\app`)
   
    const reactscript = cp.exec(`npx create-react-app ${appname}app --template cra-template-btp`);
    reactscript.stdout.on('data', (data) => {
        console.log(data);
    });
    reactscript.stderr.on('data', (data) => {
        console.error(data);
    });
    
 //console.log(process.cwd())
    //cp.execSync(`npm set-script ${s.name} "${s.value}"`)
    /*
    //install dependencies
    console.log('\nInstalling packages...'.green)
    settings.pkg.forEach(p => {
        console.log(`Adding ${p}...`)
        cp.execSync(`npm add ${p}`)
    });

    //install scripts
    console.log('\nInstalling scripts...'.green)
    settings.scripts.forEach(s => {
        console.log(`Adding ${s.name}...`)
        cp.execSync(`npm set-script ${s.name} "${s.value}"`)
    })
    */

    //const trgd = `${CURR_DIR}\\myapp`
    //fs.mkdirSync(trgd)
    //fs.ensureDirSync(trgd)




    /*
    const src = `${TMPL_DIR}\\xs-app.json`;
    const trg = `${CURR_DIR}\\xs-app.json`
    console.log(trg)

    if (!fs.existsSync(trg)) {
        fs.copyFileSync(src, trg)
    } else {
        console.log('Already there')
    }
*/
    //fs.copySync
    /*
        const projectName = 'sssaa'
    
        let contents = fs.readFileSync(trg, 'utf8');
    
        ejs.renderFile(trg, { projectName }).then((c) => {
            console.log(c)
            fs.writeFileSync(trg, c)
        })
        */
    //contents = ejs.render(contents, { projectName });
    //fs.writeFileSync(trg,contents)

    //const exec = require('child_process').exec;
    /*const myShellScript = cp.exec('npx create-react-app xxx');
    myShellScript.stdout.on('data', (data) => {
        console.log(data);
        // do whatever you want here with data
    });
    myShellScript.stderr.on('data', (data) => {
        console.error(data);
    });

    console.log('XXXXXXXXXXXX')
*/

    /*
    cmd.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });
    
    cmd.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });
    
    cmd.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });
    
    cmd.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
    */




};