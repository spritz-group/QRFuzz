const wdio = require("webdriverio");
const assert = require("assert");

var fuzzer = require('./fuzzer.js');

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    "platformName": "Android",
    "platformVersion" : "9.0",
    // "platformVersion": "10.0",
    // "platformVersion": "11.0",
    // "platformVersion": "12.0",
    "deviceName": "TestDevice",
    "app": "verificac19.apk",
    "appPackage": "it.ministerodellasalute.verificaC19",
   "appActivity": "ui.FirstActivity",
    "automationName": "UiAutomator2",
    "noReset": "true"
  }
};

async function main () {
  const driver = await wdio.remote(opts); 

  // Wait before crashing if not finding an element
  await driver.setTimeout({ 'implicit': 10000 });

  // Click "Scan QR" button
  let qrbutton = await driver.findElement("id", "it.ministerodellasalute.verificaC19:id/qrButton");
  await driver.elementClick(qrbutton.ELEMENT);

  let file = "start";

  var n = fuzzer.size();
  for (i=0; i<n; ++i){

    file = fuzzer.readFile().file;
    console.log("> QR code under analysis: " + file);

    // Wait result window 
    let checkmark = await driver.findElement("id", "it.ministerodellasalute.verificaC19:id/checkmark");

    // Await for the script before taking a screenshot
    await new Promise(r => setTimeout(r, 200));

    if (checkmark && checkmark.error == "no such element" ) {
      console.log("[QRCodeFuzzer] Unable to read QR Code: " + fuzzer.readFile().file);
      fuzzer.log();
      // Update QR
      fuzzer.requestNewQR();
      continue;
    } 
    
    // Take screenshot
    let image = await driver.takeScreenshot();

    // Save screenshot to file
    fuzzer.saveScreenshot(image);

    // Update QR
    fuzzer.requestNewQR();

    // Await for the script before continuing
    await new Promise(r => setTimeout(r, 300));

    // Go back
    await driver.back();
  }

  await driver.deleteSession();
}


main();


