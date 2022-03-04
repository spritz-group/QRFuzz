const wdio = require("webdriverio");
const assert = require("assert");

var fuzzer = require('./fuzzer.js');

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    "platformName": "Android",
    "platformVersion" : "9.0",
    "deviceName": "TestDevice",
   "appActivity": "ui.FirstActivity",
    "automationName": "UiAutomator2",
    "noReset": "true"
  }
};

async function main () {
  const driver = await wdio.remote(opts); 

  // Wait before crashing if not finding an element
  await driver.setTimeout({ 'implicit': 10000 });

  
  // +---------------------------------------------------------+
  // | TO EDIT 1: GO TO SCAN                                   |
  // +---------------------------------------------------------+
  // Click "Profile"
  let btn_profile = await driver.findElement("id", "com.wallapop:id/profile");
  await driver.elementClick(btn_profile.ELEMENT);
  
  // Click "Wallet"
  let btn_wallet = await driver.findElement("id", "com.wallapop:id/wallet_amount");
  await driver.elementClick(btn_wallet.ELEMENT);
  
  // Click "Scan"
  let btn_receive_money = await driver.findElement("id", "com.wallapop:id/receiveMoneyButton");
  await driver.elementClick(btn_receive_money.ELEMENT);
  // -----------------------------------------------------------

  let file = "start";
  var n = fuzzer.size();
  
  // For each QR code --> Perform qr check
  for (i=0; i<n; ++i){
    file = fuzzer.readFile().file;
    console.log("> QR code under analysis: " + file);

    // +---------------------------------------------------------+
    // | TO EDIT 2: RESULT VIEW                                  |
    // +---------------------------------------------------------+
    let result_view = await driver.findElement("id", "com.wallapop:id/informativeView");
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


