const wdio = require("webdriverio");
var utils = require('./spaghetti.js');
var fuzzer = require('./fuzzer.js');
const fs = require('fs');
var exec = require('child_process').exec; // used to find app pid for logs
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

async function main() {
  let driver = await startDriver();

  await goToAppScanPage(driver);

  var { start, n, file } = getJsonParams();

  // Perform QR Checking
  for (i = start; i < n; ++i) {
    file = fuzzer.readFile(utils.fuzz_path()).file;
    console.log("> QR code under analysis: " + file);

    driver = await checkAppRunningAndRestart(driver);

    // Hook to result view
    let result_view = await appIns.getResultView(driver);

    // Result view error check
    if (result_view && result_view.error == "no such element") {
      console.log("[QRCodeFuzzer] Unable to read QR Code: " + fuzzer.readFile(utils.fuzz_path()).file);
      fuzzer.log(utils.fuzz_path(), "ERROR_QR_UNREADABLE");
      
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
      driver = await startDriver();
      await goToAppScanPage(driver);
    }
  }

  await driver.deleteSession();
}

function getJsonParams() {
  let file = "start";
  var n = fuzzer.size(utils.fuzz_path());
  var start = utils.fuzz_start();
  if (start > 0) {
    console.log("[QRCodeFuzzer] Resuming QR codes from <" + start + "> of <" + n + ">")
  }
  console.log("[QRCodeFuzzer] Scan page reached! " + start);
  return { start, n, file };
}

async function startDriver() {
  let driver = await wdio.remote(opts);
  // Wait before crashing if not finding an element
  await driver.setTimeout({ 'implicit': 10000 });
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

async function checkAppRunningAndRestart(driver) {
  let appState = await driver.queryAppState(appIns.app_package);

  if (appState != 4) { // 4= running in foreground
    console.log("[QRCodeFuzzer] Process unexpectedly closed. Trying to restore...");
    driver = await startDriver();
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

    fs.writeFile(utils.fuzz_path() + "/logs/" + fuzzer.readFile(utils.fuzz_path()).file + ".txt", logcat, (err) => {
      console.log("[QRCodeFuzzer] " + err);
    });
  });
}

async function saveScreenshot(driver) {
  let image = await driver.takeScreenshot();
  fuzzer.saveScreenshot(utils.fuzz_path(), image);
  fuzzer.log(utils.fuzz_path(), "OK");
  fuzzer.requestNewQR(utils.fuzz_path());

  // Await for the script before continuing
  await new Promise(r => setTimeout(r, 300));
}

main();

