#!/bin/bash


echo "[FUZZQR] Installing node, npm, openjdk, android-tools"
sudo apt update -y
sudo apt install -y nodejs npm openjdk-11-jre openjdk-11-jdk android-sdk-build-tools


echo "[FUZZQR] Add npm global folder"
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo "export PATH=\"\$HOME/.npm-global/bin:\$PATH\"" >> ~/.bashrc
source ~/.bashrc 

echo "[FUZZQR] Installing appium globally and qr code fuzzer"
npm install -g appium;
(cd ../../fuzzqr/QRCodeFuzzer/; npm install)

# TODO: add to path in .bashrc