class Inspector {
    app_name = "postepay";
    app_package = "posteitaliane.posteapp.apppostepay";
    app_activity = "posteitaliane.posteapp.apppostepay.ui.activity.SplashActivity";

    async goToScan(driver) {
    	let ok = await driver.findElement("id", 'posteitaliane.posteapp.apppostepay:id/md_buttonDefaultPositive');
        await driver.elementClick(ok.ELEMENT);
        
    	let scan = await driver.findElement("id", 'posteitaliane.posteapp.apppostepay:id/access_qr');
        await driver.elementClick(scan.ELEMENT);       
       
    }

    async getResultView(driver) {
        return await driver.findElement("id", "posteitaliane.posteapp.apppostepay:id/md_titleFrame");
    }
    
    async goBackToScan(driver) {
    	let ok = await driver.findElement("id", 'posteitaliane.posteapp.apppostepay:id/md_buttonDefaultPositive');
        await driver.elementClick(ok.ELEMENT);

    	let scan = await driver.findElement("id", 'posteitaliane.posteapp.apppostepay:id/access_qr');
        await driver.elementClick(scan.ELEMENT);   
        }

}

exports.Inspector = Inspector;
