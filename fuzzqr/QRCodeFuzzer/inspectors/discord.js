class Inspector {
    app_name = "discord";
    app_package = "com.discord";
    app_activity = "com.discord.app.AppActivity$Main";

    async goToScan(driver) {
    	let settings = await driver.findElement("xpath", '//android.widget.RelativeLayout[@content-desc="Settings tab"]');
        await driver.elementClick(settings.ELEMENT);  

        let qr = await driver.findElement("id", 'com.discord:id/qr_scanner');
        await driver.elementClick(qr.ELEMENT); 
    }

    async getResultView(driver) {
        return await driver.findElement("id", 'com.discord:id/privacy');    
    }
    
    async goBackToScan(driver) {
    	let settings = await driver.findElement("xpath", '//android.widget.RelativeLayout[@content-desc="Settings tab"]');
        await driver.elementClick(settings.ELEMENT);  

        let qr = await driver.findElement("id", 'com.discord:id/qr_scanner');
        await driver.elementClick(qr.ELEMENT);   
    }

}

exports.Inspector = Inspector;
