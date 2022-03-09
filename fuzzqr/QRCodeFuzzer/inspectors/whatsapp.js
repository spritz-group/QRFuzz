class Inspector {
    app_name = "whatsapp";
    app_package = "com.whatsapp";
    app_activity = "com.whatsapp.Main";

    async goToScan(driver) {
        let menu = await driver.findElement("id", "com.whatsapp:id/menuitem_overflow");
        await driver.elementClick(menu.ELEMENT);
        
        let settings = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.LinearLayout[5]/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.TextView');
        await driver.elementClick(settings.ELEMENT);

        let qr = await driver.findElement("id", 'com.whatsapp:id/profile_info_qr_code');
        await driver.elementClick(qr.ELEMENT);

        let scan = await driver.findElement("xpath", "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.HorizontalScrollView/android.widget.LinearLayout/android.widget.FrameLayout[2]/android.widget.TextView");
        await driver.elementClick(scan.ELEMENT);
    }

    async getResultView(driver) {
        return await driver.findElement("id", "com.whatsapp:id/alertTitle"); // FIXME: Not showing error message!
    }
    
    async goBackToScan(driver) {}

}

exports.Inspector = Inspector;