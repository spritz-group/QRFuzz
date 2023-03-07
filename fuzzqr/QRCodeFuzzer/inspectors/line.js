class Inspector {
    app_name = "line";
    app_package = "jp.naver.line.android";
    app_activity = "jp.naver.line.android.activity.SplashActivity";

    async goToScan(driver) {
    	let settings = await driver.findElement("id", 'jp.naver.line.android.registration:id/login');
        await driver.elementClick(settings.ELEMENT);  
        
        let qr = await driver.findElement("id", 'jp.naver.line.android.registration:id/auth_with_qr_code');
        await driver.elementClick(qr.ELEMENT); 

        let scan = await driver.findElement("id", 'jp.naver.line.android.registration:id/scan_qr');
        await driver.elementClick(scan.ELEMENT); 
    }

    async getResultView(driver) {
        return await driver.findElement("id", 'jp.naver.line.android:id/snackbar_title');
    }
    
    async goBackToScan(driver) {
        let close = await driver.findElement("id", 'jp.naver.line.android:id/snackbar_close_icon');
        await driver.elementClick(close.ELEMENT);   

        // await driver.back(); 

        // let scan = await driver.findElement("id", 'jp.naver.line.android.registration:id/scan_qr');
        // await driver.elementClick(scan.ELEMENT); 

        // let scan = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.widget.TextView');
        // await driver.elementClick(scan.ELEMENT); 
    }

}

exports.Inspector = Inspector;