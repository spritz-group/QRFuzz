const wdio = require("webdriverio");
var loader = require('./loader.js');
var fuzzer = require('./fuzzer.js');
const fs = require('fs');
var exec = require('child_process').exec; // used to find app pid for logs
loader.checkArguments();
let app = loader.getAppInspector();
let appIns = new app.Inspector();

const opts = {
  path: '/wd/hub',
  port: loader.fuzz_port(), // 4723,
  capabilities: {
    "platformName": "Android",
    "appPackage": appIns.app_package,
    "appActivity": appIns.app_activity,
    "automationName": "UiAutomator2",
    "noReset": "true"
  }
};

// Handler to detect CTRL+C to exit the program
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


// Main loop
// Curious developer, start from here :)

async function main() {
  let driver = await startDriver(loader.wdio_timeout());

  await goToAppScanPage(driver);

  var { start, n, file } = getJsonParams();

  // Perform QR Checking
  for (i = start; i < n; ++i) {
    file = fuzzer.readFile(loader.fuzz_path()).file;
    console.log("> QR code under analysis: " + file);

    driver = await checkAppRunningAndRestart(driver, loader.wdio_timeout());

    // Hook to result view
    let result_view = await appIns.getResultView(driver);

    // Result view error check
    if (result_view && result_view.error == "no such element") {
      console.log("[QRCodeFuzzer] Unable to read QR Code: " + fuzzer.readFile(loader.fuzz_path()).file);
      fuzzer.log(loader.fuzz_path(), "ERROR_QR_UNREADABLE");
      
      await saveLogcat(driver);
      await saveScreenshot(driver);
      continue;
    }

    // Await for the script before taking a screenshot
    await new Promise(r => setTimeout(r, 200));

    await saveLogcat(driver);
    await saveScreenshot(driver);

    try {
      await appIns.goBackToScan(driver);
    } catch (error) {
      driver = await startDriver(10000);
      await goToAppScanPage(driver);
    }
  }

  await driver.deleteSession();
}


// Get the JSON parameters of fuzzer.json
function getJsonParams() {
  let file = "start";
  var n = fuzzer.size(loader.fuzz_path());
  var start = loader.fuzz_start();
  if (start > 0) {
    console.log("[QRCodeFuzzer] Resuming QR codes from <" + start + "> of <" + n + ">")
  }
  console.log("[QRCodeFuzzer] Scan page reached! " + start);
  return { start, n, file };
}


// Start and set the config for the WebdriverIO
async function startDriver(timeout=10000) {
  let driver = await wdio.remote(opts);
  // Wait before crashing if not finding an element
  await driver.setTimeout({ 'implicit': timeout });
  return driver;
}

async function goToAppScanPage(driver) {
  try {
    await appIns.goToScan(driver);
  } catch (error) {
    console.log("[QRCodeFuzzer] Unable to go to the scan page (error: " + error + ")");
    console.log("[QRCodeFuzzer] Please place the App manually in the scan page; then press any key to continue...");
    await keypress();
  }
}

async function checkAppRunningAndRestart(driver, timeout=10000) {
  let appState = await driver.queryAppState(appIns.app_package);

  if (appState != 4) { // 4= running in foreground
    console.log("[QRCodeFuzzer] Process unexpectedly closed. Trying to restore...");
    driver = await startDriver(timeout);
    await goToAppScanPage(driver);
  }
  return driver;
}

async function saveLogcat(driver) {
  let logs = await driver.getLogs('logcat');

  // execute child process searching for pid : `adb shell pidof apppackage`
  exec('adb shell pidof '+appIns.app_package, function (error, stdOut, stdErr) {
    let pid = Number(stdOut);
    let logcat = ""
    
    if (pid == NaN) { // if pid not found: seach by name|package
      logcat = logs
        .filter(entry => entry.message.toLowerCase().includes(appIns.app_name) || entry.message.toLowerCase().includes(appIns.app_package))
        .map(entry => entry.message).join('\n');
    } else { // search for pid
      logcat = logs
        .filter(entry => entry.message.toLowerCase().includes(pid))
        .map(entry => entry.message).join('\n');
    }

    fs.writeFile(loader.fuzz_path() + "/logs/" + fuzzer.readFile(loader.fuzz_path()).file + ".txt", logcat, (err) => {
      console.log("[QRCodeFuzzer] " + err);
    });
  });
}

async function saveScreenshot(driver) {
  let image = await driver.takeScreenshot();
  fuzzer.saveScreenshot(loader.fuzz_path(), image);
  fuzzer.log(loader.fuzz_path(), "OK");
  fuzzer.requestNewQR(loader.fuzz_path());

  // Await for the script before continuing
  await new Promise(r => setTimeout(r, 300));
}

main();

