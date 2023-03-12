class Inspector {
    app_name = "chrome";
    app_package = "com.google.android.googlequicksearchbox";
    app_activity = "com.google.android.googlequicksearchbox.SearchActivity";

    // Note: only the first QR gives a different error (that is QR not recognized because does not start with the URL required).

    async goToScan(driver) {
    	// let scan = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.ScrollView/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView[1]/android.view.ViewGroup[1]');

        let lens = await driver.findElement("id", 'com.google.android.googlequicksearchbox:id/googleapp_lens_icon');
        await driver.elementClick(lens.ELEMENT);   

        // let scan = await driver.findElement("id", 'com.google.android.googlequicksearchbox:id/lens_camera_cutout_image');
        // await driver.elementClick(scan.ELEMENT);       
    }

    async getResultView(driver) {
        await new Promise(r => setTimeout(r, 200));
        //return await driver.findElement("id", "com.google.android.googlequicksearchbox:id/googleapp_lens_icon");
    }
    
    async goBackToScan(driver) {  

        await driver.back();  

        let lens = await driver.findElement("id", 'com.google.android.googlequicksearchbox:id/googleapp_lens_icon');
        await driver.elementClick(lens.ELEMENT); 
        

        // let scan = await driver.findElement("id", 'com.google.android.googlequicksearchbox:id/lens_camera_cutout_image');
        // await driver.elementClick(scan.ELEMENT);     
    }

}

exports.Inspector = Inspector;