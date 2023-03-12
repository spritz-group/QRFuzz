class Inspector {
    app_name = "shein";
    app_package = "com.zzkko";
    app_activity = "com.shein.welcome.WelcomeActivity";

    async goToScan(driver) {
        // let skip = await driver.findElement("id", "com.zzkko:id/tv_skip");
        // await driver.elementClick(skip.ELEMENT);
        
        // let search = await driver.findElement("xpath", '//android.widget.ImageView[@content-desc="Search"]');
        // await driver.elementClick(search.ELEMENT);

        let profile = await driver.findElement("id", "com.zzkko:id/main_nav_me");
        await driver.elementClick(profile.ELEMENT);

        let scan = await driver.findElement("id", "com.zzkko:id/img_scan");
        await driver.elementClick(scan.ELEMENT);
    }

    async getResultView(driver) {
        return await driver.findElement("id", "com.teacapps.barcodescanner:id/list");
    }
    
    async goBackToScan(driver) {}

}

exports.Inspector = Inspector;