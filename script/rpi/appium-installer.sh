#!/bin/bash

## TODO: to test

sudo apt update
sudo apt install -y nodejs npm openjdk-11-jre openjdk-11-jdk android-sdk-build-tools

npm install appium
npm install ../../QRCodeFuzzer/

# TODO: add to path in .bashrc