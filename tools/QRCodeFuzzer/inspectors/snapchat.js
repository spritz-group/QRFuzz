class Inspector {
    app_name = "snapchat";
    app_package = "com.snapchat.android";
    app_activity = "com.snapchat.android.LandingPageActivity";

    async goToScan(driver) {

        let scan = await driver.findElement("xpath", '//android.widget.FrameLayout[@content-desc="Camera"]');        
        await driver.elementClick(scan.ELEMENT);
    }

    async getResultView(driver) {
        // not very precise unfortunately...
        await driver.findElement("xpath", "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout");
        await new Promise(r => setTimeout(r, 1000)); 
    }

    async goBackToScan(driver) {
        // the screenshot will automatically close this
        //let close = await driver.findElement("xpath", "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.widget.ImageView[2]");
        //await driver.elementClick(close.ELEMENT);

        let scan = await driver.findElement("xpath", '//android.widget.FrameLayout[@content-desc="Camera"]');        
        await driver.elementClick(scan.ELEMENT);

    }
}

exports.Inspector = Inspector;