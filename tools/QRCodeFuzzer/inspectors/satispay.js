class Inspector {
    app_name = "satispay";
    app_package = "com.satispay.customer";
    app_activity = "com.satispay.customer.home.StartupActivity";

    async goToScan(driver) {
        await driver.findElement("id","com.satispay.customer:id/scannerText");
    }

    async getResultView(driver) {
        return await driver.findElement("id", "com.satispay.customer:id/alertTitle");
    }
    
    async goBackToScan(driver) {
    	let ok = await driver.findElement("id", 'android:id/button1');
        await driver.elementClick(ok.ELEMENT);
    }

}

exports.Inspector = Inspector;
