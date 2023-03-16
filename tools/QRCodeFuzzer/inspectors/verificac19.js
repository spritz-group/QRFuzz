class Inspector {
    app_name = "verificac19";
    app_package = "it.ministerodellasalute.verificaC19";
    app_activity = "it.ministerodellasalute.verificaC19.ui.SplashScreenActivity";

    async goToScan(driver) {
        let scan = await driver.findElement("id", 'it.ministerodellasalute.verificaC19:id/qrButton');
        await driver.elementClick(scan.ELEMENT);       
    }

    async getResultView(driver) {
        return await driver.findElement("id", "it.ministerodellasalute.verificaC19:id/certificate_valid");
    }
    
    async goBackToScan(driver) {
        driver.back();
    	// let ok = await driver.findElement("id", 'it.ministerodellasalute.verificaC19:id/close_button');
        // await driver.elementClick(ok.ELEMENT);
    }

}

exports.Inspector = Inspector;
