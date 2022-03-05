const path = require('path');
const fs = require('fs');
const { exit } = require('process');


let allInspectors = fs.readdir(path.join(__dirname, './inspectors/'), function (err, files) {
    if (err) {
        console.log('Unable to scan directory: ' + err);
        exit(1);
    } 

    all = []
    files.forEach(function (file) {
        all.push(path.parse(file).name);
    });
    return all;
});

exports.all_inspectors = allInspectors;
