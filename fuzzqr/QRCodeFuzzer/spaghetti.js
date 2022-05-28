const path = require('path');
const fs = require('fs');

let port = 4723;
let dpath = "./data";
let device = "TestDevice"

function checkArguments() {

    console.info("[Usage:] node index.js <app_inspector> [optional: <data_path> <appium_port> <appium_device_udid>]");
    
    let argPath = process.argv[3];
    let argPort = process.argv[4];
    let argDevice = process.argv[5];

    if(argPath === undefined)
        console.warn("[QRCodeFuzzer] Defaulting to path " + dpath);
    else {
        dpath = argPath
        if(dpath.charAt(dpath.length-1) == "/"){
            dpath = dpath.slice(0, -1);
        }
        console.info("[QRCodeFuzzer] Using path: " + dpath);
    }

    if(!fs.existsSync(dpath)){
        console.error("[QRCodeFuzzer] Directory path does not exists");
        process.exit(1);
    }

    if(argPort === undefined)
        console.warn("[QRCodeFuzzer] Defaulting to port " + port);
    else if(isNaN(argPort)) {
        console.error("[QRCodeFuzzer] Wrong port number, not a number");
        process.exit(1);
    }
    else {
        port = parseInt(argPort);
        console.info("[QRCodeFuzzer] Using port: " + port);
    }

    if(argDevice === undefined)
        console.warn("[QRCodeFuzzer] Defaulting to device name: " + device);
    else {
        device = argDevice
        console.info("[QRCodeFuzzer] Using device name: " + device);
    }

}

// This function, which is an elegant spaghetti code, checks and include the correct
// app inspector depending on the parameter passed in the function

let ifiles = [];
function getAppInspector() {

    let arg = process.argv[2];
    console.log("[QRCodeFuzzer] Checking inspector validity...");

    fs.readdirSync(path.join(__dirname, './inspectors')).forEach(function (file) {
        ifiles.push(path.parse(file).name);
    });

    if(!(ifiles.includes(arg))) {
        console.log("[QRCodeFuzzer] Wrong inspector passed! Please pass a filename from ./inspectors folder. Available options: ");
        console.log(ifiles);
        process.exit(1);
    }

    console.log("[QRCodeFuzzer] OK, starting Appium...");
    return require('./inspectors/' + arg + ".js");
};

let getPath = () => dpath;
let getPort = () => port;
let getDevice = () => device;

exports.getAppInspector = getAppInspector;
exports.checkArguments = checkArguments;
exports.fuzz_path = getPath;
exports.fuzz_port = getPort;
exports.fuzz_device = getDevice;