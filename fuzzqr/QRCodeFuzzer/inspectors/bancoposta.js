class Inspector {
    app_name = "bancoposta";
    app_package = "posteitaliane.posteapp.appbpol";
    app_activity = "posteitaliane.posteapp.appbpol.ui.activity.SplashActivity";

    async goToScan(driver) {
    	let scan = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.ScrollView/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView[1]/android.view.ViewGroup[1]');
        await driver.elementClick(scan.ELEMENT);       
       
    }

    async getResultView(driver) {
        return await driver.findElement("id", "posteitaliane.posteapp.appbpol:id/md_titleFrame");
    }
    
    async goBackToScan(driver) {
    	let ok = await driver.findElement("id", 'posteitaliane.posteapp.appbpol:id/md_buttonDefaultPositive');
        await driver.elementClick(ok.ELEMENT);

    	let scan = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.ScrollView/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView[1]/android.view.ViewGroup[1]');
        await driver.elementClick(scan.ELEMENT);   
    }

}

exports.Inspector = Inspector;