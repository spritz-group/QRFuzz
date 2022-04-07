const exp = require('constants');
const fs = require('fs');
const _json_file = "fuzzer.json";
const _qrcoderr_file = "qrcodes-error.txt";
const _screen_path = "screen/";

// Logic of status
//  0 = keep the same QR code shown
//  1 = change the QR code to the next one

let _fuzzer = { status: 0, file: "none", size: 0}

function readFuzzer(path) {
  let rawdata = fs.readFileSync(path + "/" + _json_file);
  let fuzzer = JSON.parse(rawdata);
  _fuzzer = fuzzer;
  return fuzzer;
}

function requestNewQRFuzzer(path) {
  _fuzzer.status = 1;
  fs.writeFileSync(path + "/" + _json_file, JSON.stringify(_fuzzer));
}

function updateAndGetSize(path) {
  readFuzzer(path);
  return _fuzzer.size;
}

function saveScreenshot(path, image) {
  readFuzzer(path);
  fs.writeFile(path + "/" + _screen_path + _fuzzer.file + ".png", image, 'base64', function(err) {
    console.info("[QRCodeFuzzer] " + err);
  });
}

function errorLog(path) {
  readFuzzer(path);
  fs.appendFile(path + "/" + _qrcoderr_file, Date() + ": " +_fuzzer.file + "\n", (err) => {
    console.warn("[QRCodeFuzzer] " + err);
  });
}

exports._fuzzer_file = _json_file;
exports._fuzzer = _fuzzer;
exports.readFile = readFuzzer;
exports.requestNewQR = requestNewQRFuzzer;
exports.size = updateAndGetSize;
exports.saveScreenshot = saveScreenshot;
exports.log = errorLog;