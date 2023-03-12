#!/bin/bash

# Bash variables installer (optional)
# NOTE: Make sure to have npm global folder and ANDROID_HOME setted

echo "[QRFUZZ] Add npm global folder to .bashrc"
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo "export PATH=\"\$HOME/.npm-global/bin:\$PATH\"" >> ~/.bashrc
source ~/.bashrc 

echo "[QRFUZZ] Add Android_Home to .bashrc"
echo "export ANDROID_HOME=\"/usr/lib/android-sdk\"" >> ~/.bashrc
source ~/.bashrc 

echo "[QRFUZZ] BASH VARIABLES INSTALLED"