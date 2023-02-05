#!/bin/bash

# Appium and Android installer

echo "[FUZZQR] Installing node, npm, openjdk, android-tools"
sudo apt update -y
sudo apt install -y nodejs npm openjdk-11-jre openjdk-11-jdk android-sdk-build-tools android-sdk

echo "[FUZZQR] Installing appium globally and qr code fuzzer"
npm install -g appium;
(cd ../../fuzzqr/QRCodeFuzzer/; npm install)

echo "[FUZZQR] APPIUM AND ANDROID INSTALLED"