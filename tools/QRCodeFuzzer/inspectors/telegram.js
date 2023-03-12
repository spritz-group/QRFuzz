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
        // activate the sleep if you are using generic qr codes
        // await new Promise(r => setTimeout(r, 1000));
        // ... or activate the following if you are instead using ad-hoc qr codes
        return await driver.findElement("xpath", '//android.widget.TextView[@text="OK"]');
    }
    
    async goBackToScan(driver) {
        let ok = await driver.findElement("xpath", '//android.widget.TextView[@text="OK"]');
        await driver.elementClick(ok.ELEMENT);

        let qr = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[2]/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]/android.widget.TextView[2]');
        await driver.elementClick(qr.ELEMENT);
    }

}

exports.Inspector = Inspector;