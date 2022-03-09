class Inspector {
    app_name = "paypal";
    app_package = "com.paypal.android.p2pmobile";
    app_activity = "com.paypal.android.p2pmobile.startup.activities.StartupActivity";

    async goToScan(driver) {

        let qr = await driver.findElement("xpath", '//android.widget.ImageView[@content-desc="QR Code"]');
        await driver.elementClick(qr.ELEMENT);

        let scan = await driver.findElement("id", "com.instagram.android:id/bottom_button");
        await driver.elementClick(scan.ELEMENT);
    }

    async getResultView(driver) {
        // ??? // FIXME: Not showing error message!
    }
    
    async goBackToScan(driver) {}

}

exports.Inspector = Inspector;