class Inspector {
    app_name = "instagram";
    app_package = "com.instagram.android";
    app_activity = "com.instagram.android.activity.MainTabActivity";

    // 2022-07-10 - Instagram - commented part are not working
    async goToScan(driver) {
        let profile = await driver.findElement("id", "com.instagram.android:id/profile_tab");
        await driver.elementClick(profile.ELEMENT);
        
        // let opt = await driver.findElement("xpath", '//android.widget.Button[@content-desc="Options"]');
        // await driver.elementClick(opt.ELEMENT);

        // let qr = await driver.findElement("xpath", '//android.widget.Button[@content-desc="QR code"]');
        // await driver.elementClick(qr.ELEMENT);

        let scan = await driver.findElement("id", "com.instagram.android:id/bottom_button");
        await driver.elementClick(scan.ELEMENT);
    }

    async getResultView(driver) {
        return await driver.findElement("id", "com.instagram.android:id/dialog_container");
    }
    
    async goBackToScan(driver) {}

}

exports.Inspector = Inspector;