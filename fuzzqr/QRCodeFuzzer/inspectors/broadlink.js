class Inspector {
    app_name = "broadlink";
    app_package = "cn.com.broadlink.econtrol.international";
    app_activity = "cn.com.broadlink.unify.app.main.activity.LoadingActivity";

    async goToScan(driver) {

        let plus = await driver.findElement("id", 'cn.com.broadlink.econtrol.international:id/iv_add');
        await driver.elementClick(plus.ELEMENT);

        let scan = await driver.findElement("xpath", '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.LinearLayout[2]');
        await driver.elementClick(scan.ELEMENT);        
    }

    async getResultView(driver) {
        return await driver.findElement("id", 'cn.com.broadlink.econtrol.international:id/dialog_yes');    
    }
    
    async goBackToScan(driver) {
        let ok = await driver.findElement("id", 'cn.com.broadlink.econtrol.international:id/dialog_yes');
        await driver.elementClick(ok.ELEMENT);
    }

}

exports.Inspector = Inspector;