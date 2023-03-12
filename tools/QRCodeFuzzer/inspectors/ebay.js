class Inspector {
    app_name = "ebay";
    app_package = "com.ebay.mobile";
    app_activity = "com.ebay.mobile.activities.MainActivity";

    async goToScan(driver) {

        let search = await driver.findElement("xpath", '//android.widget.TextView[@content-desc="Search Keyword Search on eBay"]');        
        await driver.elementClick(search.ELEMENT);

        let code = await driver.findElement("xpath", '//android.widget.ImageButton[@content-desc="Scan a barcode"]');        
        await driver.elementClick(code.ELEMENT);
    }

    async getResultView(driver) {
        return await driver.findElement("xpath", "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout");
    }

    async goBackToScan(driver) {
        // the screenshot will automatically close this
        //let search = await driver.findElement("xpath", '//android.widget.TextView[@content-desc="Search Keyword Search on eBay"]');        
        //await driver.elementClick(search.ELEMENT);

        let code = await driver.findElement("xpath", '//android.widget.ImageButton[@content-desc="Scan a barcode"]');        
        await driver.elementClick(code.ELEMENT);

    }
}

exports.Inspector = Inspector;