# Test-bench Installation

![QRFuzz banner](images/qrfuzz-banner.png)

## Linux (Debian)

> This version has been tested only with Debian 10 and 11.

1. Move inside `scripts/debian-installer/`
2. Execute `./pyhton-installer.sh`
3. Execute `./appium-installer.sh`
4. (OPTIONAL) Execute `./bash-variables-installer.sh`; this will add ANDROID_HOME to bashrc and a global folder in `~/.npm-global`.

## Windows

Windows is supported by Appium and TK (for QR Gen), but we do not provide documentation for the installation at the moment.
You should proceed with the classic installation of QRCodeFuzzer and QRCodeGenerator via npm and python/pip respectively.

## MacOS / Linux (General)

We do not provide documentation at the moment, but you should be free to find corresponding packages by looking at the shell scripts installation commands.
You should proceed with the classic installation of QRCodeFuzzer and QRCodeGenerator via npm and python/pip respectively.
