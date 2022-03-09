class Inspector {
    app_name = "tiktok";
    app_package = "com.zhiliaoapp.musically";
    app_activity = "com.ss.android.ugc.aweme.splash.SplashActivity";

    async goToScan(driver) {
        // Click "Profile"
        let btn_profile = await driver.findElement("id", "com.zhiliaoapp.musically:id/cwl");
        await driver.elementClick(btn_profile.ELEMENT);
        
        // Click "menu"
        let btn_menu = await driver.findElement("id", "com.zhiliaoapp.musically:id/nav_end");
        await driver.elementClick(btn_menu.ELEMENT);
        
        // Click "settings"
        let btn_settings = await driver.findElement("xpath", "//android.widget.LinearLayout[2]");
        await driver.elementClick(btn_settings.ELEMENT);
        
        // Click "qr"
        let btn_qr = await driver.findElement("xpath", '//android.widget.RelativeLayout[@content-desc="QR code"]');
        await driver.elementClick(btn_qr.ELEMENT);
        
        // Click "Scan"
        let btn_scan = await driver.findElement("id", "com.zhiliaoapp.musically:id/dw4");
        await driver.elementClick(btn_scan.ELEMENT);
    }

    async getResultView(driver) {
        return await driver.findElement("id", "com.zhiliaoapp.musically:id/title");
    }

    async goBackToScan(driver) {
        let btn_scan = await driver.findElement("id", "com.zhiliaoapp.musically:id/dw4");
        await driver.elementClick(btn_scan.ELEMENT);
    }
}

exports.Inspector = Inspector;