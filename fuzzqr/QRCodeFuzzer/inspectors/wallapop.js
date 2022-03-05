class Inspector {
    app_name = "wallpop"
    app_package = "com.wallapop"
    app_activity = ".activities.HomeActivity"

    async goToScan(driver) {
        // Click "Profile"
        let btn_profile = await driver.findElement("id", "com.wallapop:id/profile");
        await driver.elementClick(btn_profile.ELEMENT);
        
        // Click "Wallet"
        let btn_wallet = await driver.findElement("id", "com.wallapop:id/wallet_amount");
        await driver.elementClick(btn_wallet.ELEMENT);
        
        // Click "Scan"
        let btn_receive_money = await driver.findElement("id", "com.wallapop:id/receiveMoneyButton");
        await driver.elementClick(btn_receive_money.ELEMENT);
    }

    async getResultView(driver) {
        return await driver.findElement("id", "com.wallapop:id/informativeView");
    }

}

exports.Inspector = Inspector