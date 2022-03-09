class Inspector {
    app_name = "telegram";
    app_package = "org.telegram.messenger";
    app_activity = "org.telegram.ui.LaunchActivity";

    async goToScan(driver) {
        let menu = await driver.findElement("xpath", '//android.widget.ImageView[@content-desc="Open navigation menu"]');
        await driver.elementClick(menu.ELEMENT);

        let settings = await driver.findElement("xpath", '//android.widget.FrameLayout[8]');
        await driver.elementClick(settings.ELEMENT);

        let devices = await driver.findElement("xpath", '//android.widget.FrameLayout[11]');
        await driver.elementClick(devices.ELEMENT);

        let qr = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[2]/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]/android.widget.TextView[2]');
        await driver.elementClick(qr.ELEMENT);
    }

    async getResultView(driver) {
        return await driver.findElement("xpath", '//android.widget.TextView[@text="OK"]');
    }
    
    async goBackToScan(driver) {
        let qr = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[2]/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]/android.widget.TextView[2]');
        await driver.elementClick(qr.ELEMENT);
    }

}

exports.Inspector = Inspector;