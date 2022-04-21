class Inspector {
    app_name = "zoom";
    app_package = "us.zoom.videomeetings";
    app_activity = "com.zipow.videobox.LauncherActivity";

    async goToScan(driver) {
    	let settings = await driver.findElement("xpath", '//android.widget.RelativeLayout[@content-desc="More tab."]/android.widget.LinearLayout/android.widget.TextView');
        await driver.elementClick(settings.ELEMENT);
        
        let scan = await driver.findElement("text", 'Scan QR Code');
        await driver.elementClick(scan.ELEMENT);
        
       
    }

    async getResultView(driver) {
        return await driver.findElement("xpath", "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Button");
    }
    
    async goBackToScan(driver) {
    	let cancel = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Button');
        await driver.elementClick(cancel.ELEMENT);

        let scan = await driver.findElement("text", 'Scan QR Code');
        await driver.elementClick(scan.ELEMENT);
        }

}

exports.Inspector = Inspector;