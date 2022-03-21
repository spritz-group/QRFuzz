const wdio = require("webdriverio");
var utils = require('./spaghetti.js');
var fuzzer = require('./fuzzer.js');
utils.checkArguments();
let app = utils.getAppInspector();
let appIns = new app.Inspector();

const opts = {
  path: '/wd/hub',
  port: utils.fuzz_port(), // 4723,
  capabilities: {
    "platformName": "Android",
    "deviceName": utils.fuzz_device(), // "TestDevice",
    "appPackage": appIns.app_package,
    "appActivity": appIns.app_activity,
    "automationName": "UiAutomator2",
    "noReset": "true"
  }
  // "app": appIns.app_apk, // not needed
  // "platformVersion" : "9.0", // cross platform
};

async function main () {
  const driver = await wdio.remote(opts); 

  // Wait before crashing if not finding an element
  await driver.setTimeout({ 'implicit': 10000 });

  // +---------------------------------------------------------+
  // | GO TO SCAN PAGE                                         |
  // +---------------------------------------------------------+
  await appIns.goToScan(driver);
  // -----------------------------------------------------------

  let file = "start";
  var n = fuzzer.size();
  
  // Perform QR Checking
  for (i=0; i<n; ++i){
    file = fuzzer.readFile(utils.fuzz_path()).file;
    console.log("> QR code under analysis: " + file);

    // +---------------------------------------------------------+
    // | RESULT VIEW                                             |
    // +---------------------------------------------------------+
    let result_view = await appIns.getResultView(driver);
    // -----------------------------------------------------------

    // Await for the script before taking a screenshot
    await new Promise(r => setTimeout(r, 200));

    //Logcat
    let logs = await driver.getLogs('logcat');
    let logcat = logs
      .filter(entry => entry.message.toLowerCase().includes(appIns.app_name) || entry.message.toLowerCase().includes(appIns.app_package))
      .map(entry => entry.message).join('\n');
    fs.writeFile("./data/logs/" + fuzzer.readFile().file + ".txt", logcat, (err) => {
      console.log("[QRCodeFuzzer] " + err);
    });
    
  
    if (result_view && result_view.error == "no such element" ) {
      console.log("[QRCodeFuzzer] Unable to read QR Code: " + fuzzer.readFile(utils.fuzz_path()).file);
      fuzzer.log(utils.fuzz_path());
      // Update QR
      fuzzer.requestNewQR(utils.fuzz_path());
      continue;
    }
    
    // Take screenshot
    let image = await driver.takeScreenshot();

    // Save screenshot to file
    fuzzer.saveScreenshot(utils.fuzz_path(), image);

    // Update QR
    fuzzer.requestNewQR(utils.fuzz_path());

    // Await for the script before continuing
    await new Promise(r => setTimeout(r, 300));

    // Go back
    await driver.back();
    
    // +---------------------------------------------------------+
    // | BACK TO SCAN (if needed)                                |
    // +---------------------------------------------------------+
    await appIns.goBackToScan(driver);
    // -----------------------------------------------------------
  }

  await driver.deleteSession();
}

main();


