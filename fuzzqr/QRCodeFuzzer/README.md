## Appium Client - QR Code Fuzzer

![FuzzQR banner](https://user-images.githubusercontent.com/34033090/152697122-2000350a-edfa-4129-b70a-15025e45162e.png)

Using this component it is possible to connect to an Appium Server with a running instance of a smartphone and perform commands, as well as actions, driven by the client. For simplicity, we suggest to use an Android device. If you plan to use an iOS device with an iOS app we suggest to read the documentation to make Appium working correctly ([Appium iOS documentation](http://appium.io/docs/en/drivers/ios-uiautomation/)).

This project is an improvement of [maxelweb/fuzzqr](https://github.com/maxelweb/fuzzqr) toolkit to automate the process on different kind of apps.

> Here in the `/data-tests` folder will be collected screenshots and logs obtained from the client.

### Requirements

- Smartphone with Android
- Android SDK installed (with `ANDROID_HOME` and `JAVA_HOME` environment paths correctly set)
- NodeJS with `npm` (version 6.x+)
- Appium Server (possibly the executable, otherwise install it with `npm`)
- (optional) Appium Inspector (same, can be useful to generate macro sequence of actions)
- Windows, Linux and Mac OS are supported
