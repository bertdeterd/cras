//const colors = require('colors');
//const { types } = require('./values');

const ejs = require('ejs')
const cp = require("child_process");
const fs = require("fs-extra")
const path = require('path')
// export function to list coffee
module.exports = function (name) {

    //curr_dir is where node is called from 
    const CURR_DIR = process.cwd();
    console.log(CURR_DIR)

const xx = fs.readdirSync(CURR_DIR)
console.log(xx)

//dirname = dir of this module
const templatePath = path.join(__dirname, 'template')
console.log(templatePath) 

const trgd = `${CURR_DIR}\\myapp`
//fs.mkdirSync(trgd)
fs.ensureDirSync(trgd)



cp.execSync('npm set-script start "http-server ."')
const src = `${templatePath}\\xs-app.json` ;
const trg = `${CURR_DIR}\\xs-app.json` 
console.log(trg) 

if(!fs.existsSync(trg)){
    fs.copyFileSync(src,trg)
}else{
    console.log('Already there')
}

const projectName = 'sssaa'

let contents = fs.readFileSync(trg, 'utf8');

ejs.renderFile(trg, { projectName }).then( (c) => {
    console.log(c)
    fs.writeFileSync(trg,c)
})
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