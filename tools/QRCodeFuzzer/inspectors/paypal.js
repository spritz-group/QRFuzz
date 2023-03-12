class Inspector {
    app_name = "paypal";
    app_package = "com.paypal.android.p2pmobile";
    app_activity = "com.paypal.android.p2pmobile.startup.activities.StartupActivity";

    async goToScan(driver) {

        let qr = await driver.findElement("xpath", '//android.widget.ImageView[@content-desc="QR Code"]');
        await driver.elementClick(qr.ELEMENT);
    }

    async getResultView(driver) {
        await new Promise(r => setTimeout(r, 2000));
    }
    
    async goBackToScan(driver) {
        let qr = await driver.findElement("xpath", '//android.widget.ImageView[@content-desc="QR Code"]');
        await driver.elementClick(qr.ELEMENT);
    }

}

exports.Inspector = Inspector;