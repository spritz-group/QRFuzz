class Inspector {
    app_name = "ucbrowser";
    app_package = "com.UCMobile.intl";
    app_activity = "com.UCMobile.main.UCMobile";

    async goToScan(driver) {
        let b1 = await driver.findElement("xpath",'//android.widget.LinearLayout[@content-desc="Menu button"]/android.widget.ImageView');
        await driver.elementClick(b1.ELEMENT); 

        let b2 = await driver.findElement("xpath","/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[4]/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.view.ViewGroup[1]/android.widget.TextView[5]");
        await driver.elementClick(b2.ELEMENT); 
        
        let b3 = await driver.findElement("xpath","/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[4]/android.widget.RelativeLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.view.ViewGroup[2]/android.widget.TextView[1]");
        await driver.elementClick(b3.ELEMENT); 
    }

    async getResultView(driver) {
        let btnClose = await driver.findElement("id", "com.UCMobile.intl:id/button_result_cancel");
        return await driver.elementClick(btnClose.ELEMENT);
    }
    
    async goBackToScan(driver) {
        await this.goToScan(driver);
    }

}

exports.Inspector = Inspector;
