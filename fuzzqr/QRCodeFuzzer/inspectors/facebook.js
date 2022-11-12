class Inspector {
    app_name = "facebook";
    app_package = "com.facebook.katana";
    app_activity = "com.facebook.katana.LoginActivity";

    // Note: only the first QR gives a different error (that is QR not recognized because does not start with the URL required).

    async goToScan(driver) {
    	// let scan = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.ScrollView/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView[1]/android.view.ViewGroup[1]');

        let search = await driver.findElement("xpath", '//android.widget.Button[@content-desc="Search Facebook"]');
        await driver.elementClick(search.ELEMENT);    

        let edit = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.EditText');
        await driver.elementClick(edit.ELEMENT);

        let qr1 = await driver.findElement("xpath", '//android.view.ViewGroup[@content-desc="qr code"]');
        await driver.elementClick(qr1.ELEMENT); 
        
        let qr2 = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.view.ViewGroup[1]');
        await driver.elementClick(qr2.ELEMENT); 

    }

    async getResultView(driver) {
        return await driver.findElement("xpath", "/hierarchy/android.widget.Toast[1]");
    }
    
    async goBackToScan(driver) {
        // let scan = await driver.findElement("id", 'posteitaliane.posteapp.appbpol:id/access_qr');
        // await driver.elementClick(scan.ELEMENT);       
    }

}

exports.Inspector = Inspector;
