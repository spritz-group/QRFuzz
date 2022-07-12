class Inspector {
    app_name = "wallpop";
    app_package = "com.wallapop";
    app_activity = "com.wallapop.activities.HomeActivity";

    async goToScan(driver) {

        // 2022-07-12: app crash when gets to result view

        // // Click "Profile"
        // let btn_profile = await driver.findElement("id", "com.wallapop:id/profile");
        // await driver.elementClick(btn_profile.ELEMENT);
        
        // // Click "Wallet"
        // let btn_wallet = await driver.findElement("id", "com.wallapop:id/wallet_amount");
        // await driver.elementClick(btn_wallet.ELEMENT);
        
        await new Promise(r => setTimeout(r, 5000));

        // // Click "Scan"
        // let btn_receive_money = await driver.findElement("id", "com.wallapop:id/receiveMoneyButton");
        // await driver.elementClick(btn_receive_money.ELEMENT);
    }

    async getResultView(driver) {
        return await driver.findElement("id", "com.wallapop:id/informativeView");
    }

    async goBackToScan(driver) {
        await new Promise(r => setTimeout(r, 100));
    }

}

exports.Inspector = Inspector;