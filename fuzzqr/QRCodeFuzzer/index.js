const wdio = require("webdriverio");
var utils = require('./spaghetti.js');
var fuzzer = require('./fuzzer.js');
const fs = require('fs');
utils.checkArguments();
let app = utils.getAppInspector();
let appIns = new app.Inspector();

const opts = {
  path: '/wd/hub',
  port: utils.fuzz_port(), // 4723,
  capabilities: {
    "platformName": "Android",
    "appPackage": appIns.app_package,
    "appActivity": appIns.app_activity,
    "automationName": "UiAutomator2",
    "noReset": "true"
  }
};

const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', data => {
    const byteArray = [...data]
    if (byteArray.length > 0 && byteArray[0] === 3) {
      console.log('[QRCodeFuzzer] Exit program')
      process.exit(1)
    }
    process.stdin.setRawMode(false)
    resolve()
  }))
}

async function main () {
  const driver = await wdio.remote(opts); 

  // Wait before crashing if not finding an element
  await driver.setTimeout({ 'implicit': 10000 });

  try {
    // +---------------------------------------------------------+
    // | GO TO SCAN PAGE                                         |
    // +---------------------------------------------------------+
    await appIns.goToScan(driver);
    // -----------------------------------------------------------
  } catch (error) {
    console.log("[QRCodeFuzzer] Unable to go to the scan page (error: " + error + ")");
    console.log("[QRCodeFuzzer] Please place the App manually in the scan page; then press any key to continue...")
    await keypress()
  }

  let file = "start";
  var n = fuzzer.size(utils.fuzz_path());
  var start = utils.fuzz_start();

  if(start > 0) {
    console.log("[QRCodeFuzzer] Resuming QR codes from <"+start+"> of <" + n + ">")
  }

  console.log("[QRCodeFuzzer] Scan page reached! " + start);

  // Perform QR Checking
  for (i=start; i<n; ++i){
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
    fs.writeFile(utils.fuzz_path() + "/logs/" + fuzzer.readFile(utils.fuzz_path()).file + ".txt", logcat, (err) => {
      console.log("[QRCodeFuzzer] " + err);
    });
    
  
    if (result_view && result_view.error == "no such element" ) {
      console.log("[QRCodeFuzzer] Unable to read QR Code: " + fuzzer.readFile(utils.fuzz_path()).file);
      fuzzer.log(utils.fuzz_path(), "ERROR_QR_UNREADABLE");
      // Take screenshot
      let image = await driver.takeScreenshot();

      // Save screenshot to file
      fuzzer.saveScreenshot(utils.fuzz_path(), image);

      // Update QR    
      fuzzer.requestNewQR(utils.fuzz_path());

      continue;
    }
    
    // Take screenshot
    let image = await driver.takeScreenshot();

    // Save screenshot to file
    fuzzer.saveScreenshot(utils.fuzz_path(), image);

    // Add log
    fuzzer.log(utils.fuzz_path(), "OK");

    // Update QR
    fuzzer.requestNewQR(utils.fuzz_path());

    // Await for the script before continuing
    await new Promise(r => setTimeout(r, 300));

    try {

      // Go back
      // await driver.back();
    
      // +---------------------------------------------------------+
      // | BACK TO SCAN (if needed)                                |
      // +---------------------------------------------------------+
      await appIns.goBackToScan(driver);
      // -----------------------------------------------------------
    } catch (error) {
      console.log("[QRCodeFuzzer] Unable to get back to the scan page (error: " + error + ")");
      console.log("[QRCodeFuzzer] Please place the App manually in the scan page; then press any key to continue...")
      await keypress()
    }
  }

  await driver.deleteSession();
}

function captureScreenshot() {
  
}

main();
