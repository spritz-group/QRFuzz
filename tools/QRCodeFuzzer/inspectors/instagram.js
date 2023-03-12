class Inspector {
    app_name = "instagram";
    app_package = "com.instagram.android";
    app_activity = "com.instagram.android.activity.MainTabActivity";

    // updated to instagram 270
    async goToScan(driver) {
        let profile = await driver.findElement("id", "com.instagram.android:id/profile_tab");
        await driver.elementClick(profile.ELEMENT);
        
        let opt = await driver.findElement("xpath", '//android.widget.Button[@content-desc="Options"]');
        await driver.elementClick(opt.ELEMENT);

        let qr = await driver.findElement("xpath", '//android.widget.Button[@content-desc="QR code"]/android.view.ViewGroup');
        await driver.elementClick(qr.ELEMENT);

        // v269
        // let scan = await driver.findElement("id", "com.instagram.android:id/bottom_button");
        let scan = await driver.findElement("id", 'com.instagram.android:id/qr_scan_button');
        await driver.elementClick(scan.ELEMENT);
    }

    async getResultView(driver) {
        return await driver.findElement("id", "com.instagram.android:id/dialog_container");
    }
    
    async goBackToScan(driver) {
        let cancel = await driver.findElement("id", "com.instagram.android:id/auxiliary_button");
        await driver.elementClick(cancel.ELEMENT);
        
    }

}

exports.Inspector = Inspector;