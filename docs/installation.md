# Test-bench Installation

![QRFuzz banner](images/qrfuzz-banner.png)

## Debian GNU/Linux installation

> This version has been tested only with Debian 10 and 11, as well as RaspbianOS.

1. Move inside `scripts/debian-installer/`
2. Execute `./pyhton-installer.sh`
3. Execute `./appium-installer.sh`
4. (OPTIONAL) Execute `./bash-variables-installer.sh`; this will add ANDROID_HOME to bashrc and a global folder in `~/.npm-global`.

## Generic installation for Windows, MacOS, Linux

Check if these programs are already installed in your OS (and install them, if not):

- Python (3.9+) with PIP
- NodeJS (18.x+) with NPM

### QRCodeFuzzer Installation

1. Open the terminal inside `tools/QRCodeFuzzer`
2. `npm install`

### QRCodeGenerator Installation

1. Open the terminal inside `tools/QRCodeGenerator`
2. `pip install -r requirements.txt`

### Appium server

1. Follow the [instructions](https://appium.io/docs/en/about-appium/getting-started/?lang=en) from the official website