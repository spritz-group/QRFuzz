class Inspector {
    app_name = "verificac19";
    app_package = "it.ministerodellasalute.verificaC19";
    app_activity = "it.ministerodellasalute.verificaC19.ui.SplashScreenActivity";

    // Note: only the first QR gives a different error (that is QR not recognized because does not start with the URL required).

    async goToScan(driver) {
    	// let scan = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.ScrollView/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView[1]/android.view.ViewGroup[1]');

        let scan = await driver.findElement("id", 'it.ministerodellasalute.verificaC19:id/qrButton');
        await driver.elementClick(scan.ELEMENT);       
    }

    async getResultView(driver) {
        return await driver.findElement("id", "it.ministerodellasalute.verificaC19:id/certificate_valid");
    }
    
    async goBackToScan(driver) {
        driver.back();
    	// let ok = await driver.findElement("id", 'it.ministerodellasalute.verificaC19:id/close_button');
        // await driver.elementClick(ok.ELEMENT);

        // let scan = await driver.findElement("id", 'posteitaliane.posteapp.appbpol:id/access_qr');
        // await driver.elementClick(scan.ELEMENT);       
    }

}

exports.Inspector = Inspector;
