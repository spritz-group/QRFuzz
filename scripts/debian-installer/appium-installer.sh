#!/bin/bash

# Appium and Android installer

echo "[QRFUZZ] Installing node, npm, openjdk, android-tools"
sudo apt update -y
sudo apt install -y nodejs npm openjdk-11-jre openjdk-11-jdk android-sdk-build-tools android-sdk

echo "[QRFUZZ] Installing appium globally and qr code fuzzer"
npm install -g appium;
(cd ../../tools/QRCodeFuzzer/ || exit; npm install)

echo "[QRFUZZ] APPIUM AND ANDROID INSTALLED"