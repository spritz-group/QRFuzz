const wdio = require("webdriverio");
const assert = require("assert");
var fuzzer = require('./fuzzer.js');

let param = () => {
  param = process.argv[2];
  
};



let app = require('./inspectors/' + param + ".js")
let appIns = new app.Inspector();

const opts = {
  path: '/wd/hub',
  port: 4723,
  // Capabilities: https://w3c.github.io/webdriver/#capabilities
  capabilities: {
    "platformName": "Android",
    "platformVersion" : "9.0",
    "deviceName": "TestDevice",
    // "app": appIns.app_apk,
    "appPackage": appIns.app_package,
    "appActivity": appIns.app_package + appIns.app_activity,
    "automationName": "UiAutomator2",
    "noReset": "true"
  }
};

async function main () {
  const driver = await wdio.remote(opts); 

  // Wait before crashing if not finding an element
  await driver.setTimeout({ 'implicit': 10000 });

  // +---------------------------------------------------------+
  // | GO TO SCAN                                              |
  // +---------------------------------------------------------+
  await appIns.goToScan(driver);
  // -----------------------------------------------------------

  let file = "start";
  var n = fuzzer.size();
  
  // Perform QR Checking
  for (i=0; i<n; ++i){
    file = fuzzer.readFile().file;
    console.log("> QR code under analysis: " + file);

    // +---------------------------------------------------------+
    // | RESULT VIEW                                             |
    // +---------------------------------------------------------+
    let result_view = await appIns.getResultView(driver);
    // -----------------------------------------------------------

    // Await for the script before taking a screenshot
    await new Promise(r => setTimeout(r, 200));
  
    if (result_view && result_view.error == "no such element" ) {
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


