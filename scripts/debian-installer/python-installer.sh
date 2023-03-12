#!/bin/bash

# Python installer

echo "[QRFUZZ] Installing python and pip"
sudo apt update -y
sudo apt install -y python3 python3-pip python3-tk python-is-python3

echo "[QRFUZZ] Installing QRCode generator requirements"
pip install -r ../../tools/QRCodeGenerator/requirements.txt

echo "[QRFUZZ] PYTHON INSTALLED"
