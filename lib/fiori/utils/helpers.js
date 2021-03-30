const ejs = require('ejs')
const cp = require("child_process");
const fs = require("fs-extra")
const path = require('path')

var colors = require('colors');


exports.changeFileVariables = (winfile, vars) => {

    const file = `${winfile}`;
    let contents = fs.readFileSync(file, 'utf8');
    contents = ejs.render(contents, vars);
    fs.writeFileSync(file,contents)


}
    





