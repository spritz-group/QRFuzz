# QR Code Fuzzer

The QR Code Fuzzer includes an Appium Client that interacts with an Appium Server.

## Usage

1. `npm install` to install the NodeJS dependencies
2. `node main.js <inspector_name> [options]`

### Requirements

- Smartphone with Android
- Windows, Linux and Mac OS are supported
- NodeJS with `npm` (version 6.x+)
- Android SDK installed
    - `ANDROID_HOME` and `JAVA_HOME` environment paths are required
- Appium Server app
- (optional) Appium Inspector 
    - Use this to generate macro sequence of actions to use in the webdriver.io interactions

## Structure

- `data-tests/`: collection of screenshots and logs during tests
- `inspectors/`: inspector class to execute a set of predefined actions inside an app
    - Here it is possible to add new inspectors to test a new application

### Inspector example

The file name is used to invoke the inspector: `node main.js <inspector_name> [options]`.

```js
class Inspector {
    app_name = "myapp";
    app_package = "com.glados.myapp";
    app_activity = "com.glados.myapp.activities.MainActivity";

    async goToScan(driver) {
        // Code to go to the QR Code scan page
    }
    async getResultView(driver) {
        // Code to check which element should show up after a QR Code scan
    }
    async goBackToScan(driver) {
        // Code for going back to the scan page after a QR Code scan
    }
}

exports.Inspector = Inspector;
```