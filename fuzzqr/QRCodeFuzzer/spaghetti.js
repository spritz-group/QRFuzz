const path = require('path');
const fs = require('fs');

// This function, which is an elegant spaghetti code, checks and include the correct
// app inspector depending on the parameter passed in the function

let ifiles = [];
function getAppInspector() {

    let arg = process.argv[2];
    console.log("[QRCodeFuzzer] Checking param validity...");

    fs.readdirSync(path.join(__dirname, './inspectors')).forEach(function (file) {
        ifiles.push(path.parse(file).name);
    });

    if(!(ifiles.includes(arg))) {
        console.log("[QRCodeFuzzer] Wrong parameter passed! Please pass a filename from ./inspectors folder. Available options: ");
        console.log(ifiles);
        process.exit(1);
    }

    console.log("[QRCodeFuzzer] OK, starting Appium...");
    return require('./inspectors/' + arg + ".js");
};

exports.getAppInspector = getAppInspector;
