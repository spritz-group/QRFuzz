class Inspector {
    app_name = "zoom";
    app_package = "us.zoom.videomeetings";
    app_activity = "com.zipow.videobox.LauncherActivity";

    async goToScan(driver) {
    	let settings = await driver.findElement("xpath", '//android.widget.RelativeLayout[@content-desc="More tab."]/android.widget.LinearLayout/android.widget.TextView');
        await driver.elementClick(settings.ELEMENT);
        
        // scroll down to make the scan button visible
        driver.touchAction([
            {action: 'press', x: 498, y: 1683},
            {action: 'moveTo', x: 453, y: 691},
            'release'
          ]);

        let scan = await driver.findElement("id", 'us.zoom.videomeetings:id/optionScanQRCode');
        await driver.elementClick(scan.ELEMENT);
        
       
    }

    async getResultView(driver) {
        return await driver.findElement("xpath", "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Button");
    }
    
    async goBackToScan(driver) {
    	let cancel = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Button');
        await driver.elementClick(cancel.ELEMENT);
        
        // scroll down to make the scan button visible
        driver.touchAction([
            {action: 'press', x: 498, y: 1683},
            {action: 'moveTo', x: 453, y: 691},
            'release'
          ]);

        let scan = await driver.findElement("id", 'us.zoom.videomeetings:id/optionScanQRCode');
        await driver.elementClick(scan.ELEMENT);
        }

}

exports.Inspector = Inspector;
