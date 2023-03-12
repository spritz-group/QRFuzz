class Inspector {
    app_name = "messages";
    app_package = "com.google.android.apps.messaging";
    app_activity = "com.google.android.apps.messaging.ui.ConversationListActivity";

    // Note: only the first QR gives a different error (that is QR not recognized because does not start with the URL required).

    async goToScan(driver) {
    	// let scan = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.ScrollView/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView[1]/android.view.ViewGroup[1]');

        let menu = await driver.findElement("xpath", '//android.widget.ImageButton[@content-desc="More Options"]');
        await driver.elementClick(menu.ELEMENT);

        let paring = await driver.findElement("id", "com.google.android.apps.messaging:id/nav_item_device_pairing");
        await driver.elementClick(paring.ELEMENT);      

        let scan = await driver.findElement("id", "com.google.android.apps.messaging:id/scan_qr_code_button");
        await driver.elementClick(scan.ELEMENT);  
    }

    async getResultView(driver) {
        return await driver.findElement("id", "com.google.android.apps.messaging:id/alertTitle");
    }
    
    async goBackToScan(driver) {
    	let ok = await driver.findElement("id", 'android:id/button1');
        await driver.elementClick(ok.ELEMENT);

        // let scan = await driver.findElement("id", 'posteitaliane.posteapp.appbpol:id/access_qr');
        // await driver.elementClick(scan.ELEMENT);       
    }

}

exports.Inspector = Inspector;
