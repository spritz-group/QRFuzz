const exp = require('constants');
const fs = require('fs');
const _json_file = "fuzzer.json";
// const _qrcoderr_file = "qrcodes-error.csv";
const _qrcodelogs_file = "qrcodes-logs.csv";
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

function saveLog(path, behavior="UNKNOWN") {
  readFuzzer(path);
  line = Date() + "\t" 
    + behavior + "\t"
    + _fuzzer.file + "\t"
    + _fuzzer.current + "/" + _fuzzer.size + "\t"
    + _fuzzer.payload + "\t"
  fs.appendFile(path + "/" + _qrcodelogs_file, line, (err) => {
    console.warn("[QRCodeFuzzer] SAVE_LOG append error: " + err);
  });
}

function saveScreenshot(path, image) {
  readFuzzer(path);
  fs.writeFile(path + "/" + _screen_path + _fuzzer.file + ".png", image, 'base64', function(err) {
    console.info("[QRCodeFuzzer] SAVE_SCREENSHOT error: " + err);
  });
}

// function errorLog(path) {
//   readFuzzer(path);
//   fs.appendFile(path + "/" + _qrcoderr_file, Date() + ": " +_fuzzer.file + "\n", (err) => {
//     console.warn("[QRCodeFuzzer] ERROR_LOG append error: " + err);
//   });
// }

exports._fuzzer_file = _json_file;
exports._fuzzer = _fuzzer;
exports.readFile = readFuzzer;
exports.requestNewQR = requestNewQRFuzzer;
exports.size = updateAndGetSize;
exports.saveScreenshot = saveScreenshot;
exports.log = saveLog