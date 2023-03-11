class Inspector {
    app_name = "barcodescanner";
    app_package = "com.teacapps.barcodescanner";
    app_activity = "net.qrbot.ui.main.MainActivity";

    async goToScan(driver) {}

    async getResultView(driver) {
        return await driver.findElement("id", "com.teacapps.barcodescanner:id/list");
    }
    
    async goBackToScan(driver) {
        driver.back();
    }

}

exports.Inspector = Inspector;