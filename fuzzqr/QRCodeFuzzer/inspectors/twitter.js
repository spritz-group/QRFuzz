class Inspector {
    app_name = "twitter";
    app_package = "com.twitter.android";
    app_activity = "com.twitter.android.StartActivity";

    async goToScan(driver) {
    	let settings = await driver.findElement("xpath", '//android.widget.ImageButton[@content-desc="Show navigation drawer"]');
        await driver.elementClick(settings.ELEMENT);  
        
        let qr = await driver.findElement("xpath", '//android.view.ViewGroup[@content-desc="QR code"]');
        await driver.elementClick(qr.ELEMENT); 

        let scan = await driver.findElement("xpath", '//android.widget.ImageButton[@content-desc="Switch to QR Reader"]');
        await driver.elementClick(scan.ELEMENT); 
    }

    async getResultView(driver) {
        return await driver.findElement("xpath", "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.appcompat.widget.LinearLayoutCompat/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button");
    }
    
    async goBackToScan(driver) {
        let ok = await driver.findElement("xpath", "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.appcompat.widget.LinearLayoutCompat/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button");
        return await driver.elementClick(ok.ELEMENT);   
    }

}

exports.Inspector = Inspector;
