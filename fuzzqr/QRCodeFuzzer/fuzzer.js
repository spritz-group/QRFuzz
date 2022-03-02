const exp = require('constants');
const fs = require('fs');
const { get } = require('http');
const _fuzzer_file = "./data/fuzzer.json";
const _qrcoderr_file = "./data/qrcodes-error.txt";
const _screen_path = "./data/screen/";

// Logic of status
//  0 = keep the same QR code shown
//  1 = change the QR code to the next one

let _fuzzer = { status: 0, file: "none", size: 0}

function readFuzzer() {
  let rawdata = fs.readFileSync(_fuzzer_file);
  let fuzzer = JSON.parse(rawdata);
  _fuzzer = fuzzer;
  return fuzzer;
}

function requestNewQRFuzzer() {
  _fuzzer.status = 1;
  fs.writeFileSync(_fuzzer_file, JSON.stringify(_fuzzer));
}

function updateAndGetSize() {
  readFuzzer();
  return _fuzzer.size;
}

function saveScreenshot(image) {
  readFuzzer();
  fs.writeFile(_screen_path + _fuzzer.file + ".png", image, 'base64', function(err) {
    console.log("[QRCodeFuzzer] " + err);
  });
}

function errorLog() {
  readFuzzer();
  fs.appendFile(_qrcoderr_file, Date() + ": " +_fuzzer.file + "\n", (err) => {
    console.log("[QRCodeFuzzer] " + err);
  });
}

exports._fuzzer_file = _fuzzer_file;
exports._fuzzer = _fuzzer;
exports.readFile = readFuzzer;
exports.requestNewQR = requestNewQRFuzzer;
exports.size = updateAndGetSize;
exports.saveScreenshot = saveScreenshot;
exports.log = errorLog;