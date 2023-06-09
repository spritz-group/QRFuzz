# QR Code Fuzzer

The QR Code Fuzzer includes an Appium Client that interacts with an Appium Server.

## Usage

1. `npm install` to install the NodeJS dependencies
2. `node main.js <inspector_name> [options]`

### Requirements

- Smartphone with Android
- Windows, Linux and Mac OS are supported
- NodeJS (18.x+) with NPM
- Android SDK installed
  - `ANDROID_HOME` and `JAVA_HOME` environment paths are required
- Appium Server

#### Optional

- [Appium Inspector](https://github.com/appium/appium-inspector)
  - Use this app to generate macro sequence of actions to use in the webdriver.io interactions

## Structure

- `data-tests/`: collection of screenshots and logs during tests
  - **Tip**: after running a test, a new directory is created with the name of the app tested
- `inspectors/`: inspector class to execute a set of pre-defined actions inside an app
  - **Tip:**: It is possible to add new inspectors in this folder to test new applications

## Extend the tool

### Inspector example

This is an example on how to add new applications.

```js
// [Add file] inspectors/myapplication.js
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

The file name is used to invoke the inspector.

```sh
# Type in a terminal
node main.js myapplication
```
