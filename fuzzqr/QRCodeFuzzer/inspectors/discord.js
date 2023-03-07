class Inspector {
    app_name = "discord";
    app_package = "com.discord";
    app_activity = "com.discord.main.MainActivity";

    async goToScan(driver) {
    	let tab = await driver.findElement("xpath", '//android.view.View[5]');
        await driver.elementClick(tab.ELEMENT);  

    	let qr = await driver.findElement("xpath", '//android.widget.AbsListView[@content-desc="Impostazioni utente"]/android.widget.Button[9]');
        await driver.elementClick(qr.ELEMENT);  
    }

    async getResultView(driver) {
        return await driver.findElement("xpath","/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.Button");  
    }
    
    async goBackToScan(driver) {
        let ok = await driver.findElement("xpath","/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.Button");
        await driver.elementClick(ok.ELEMENT);

    	let qr = await driver.findElement("xpath", '//android.widget.AbsListView[@content-desc="Impostazioni utente"]/android.widget.Button[9]');
        await driver.elementClick(qr.ELEMENT);  
    }

}

exports.Inspector = Inspector;
