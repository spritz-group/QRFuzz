class Inspector {
    app_name = "postepay";
    app_package = "posteitaliane.posteapp.apppostepay";
    app_activity = "posteitaliane.posteapp.apppostepay.ui.activity.SplashActivity";

    async goToScan(driver) {
    	let scan = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.TextView');
        await driver.elementClick(scan.ELEMENT);       
       
    }

    async getResultView(driver) {
        return await driver.findElement("xpath", "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ScrollView/android.widget.TextView");
    }
    
    async goBackToScan(driver) {
    	let ok = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.TextView');
        await driver.elementClick(ok.ELEMENT);

    	let scan = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.TextView');
        await driver.elementClick(scan.ELEMENT);   
        }

}

exports.Inspector = Inspector;
