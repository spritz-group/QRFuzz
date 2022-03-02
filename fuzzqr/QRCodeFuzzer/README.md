## Appium Client - QR Code Fuzzer for VerificaC19

Using this component it is possible to connect to an Appium Server with a running instance of a smartphone and perform commands, as well as actions, driven by the client. For simplicity, we suggest to use an Android device. If you plan to use an iOS device with an iOS app we suggest to read the documentation to make Appium working correctly ([Appium iOS documentation](http://appium.io/docs/en/drivers/ios-uiautomation/)).

> Here in the `/data` folder will be collected screenshots and logs obtained from the client.

### Requirements

- Smartphone with Android
- Android SDK installed (with `ANDROID_HOME` and `JAVA_HOME` environment paths correctly set)
- NodeJS with `npm` (version 6.x+)
- Appium Server (possibly the executable, otherwise install it with `npm`)
- (optional) Appium Inspector (same, can be useful to generate macro sequence of actions)
- Windows, Linux and Mac OS are supported


### Usage

#### Server

> Make sure to have a copy of the APK inside the same folder where the server is executed

1. Connect the smartphone to the PC with a USB and enable the debug mode, so that Android can be recognized.
2. Turn on the Appium Server application (should be a normal executable, checkout the *appium server documentation*)

#### Client

> Make sure to have a copy of the APK inside the same folder where the client is executed

1. Enter the `QRCodeFuzzer/` folder using the terminal
2. Modify the `index.js` file and change the initial configuration according to your needs
3. Execute `node index.js` (if it is the first time, execute `npm install` before this command)


### Development

You can import the `fuzzer.js` module in a different JS file and execute that instaed so as to coordinate the script from the visualizer.

### Future improvements

- Try to create a script working inside a VM to do parallelism

#### Extra tips

> Here are some notes to try to use v4l2loopback on Linux to simulate the camera through a virtual video device

Add v4l2loopback mock camera to modprobe module: 
`sudo modprobe v4l2loopback video_nr=0 card_label="mockCam"`

Launch QR Code to transmit inside the `/dev/videoX` device. 
`gst-launch-1.0 filesrc location=qr.png ! pngdec ! imagefreeze ! v4l2sink device=/dev/video0`

### Credits

Original version made by @Maxelweb (Mariano Sciacco) and @Kero2375 (Federico Carboni) for Advanced Topics in Computer and Network Security @ UniPD (2021-22).
