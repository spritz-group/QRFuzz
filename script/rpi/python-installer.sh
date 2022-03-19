#!/bin/bash


echo "[FUZZQR] Installing python and pip"
sudo apt update -y
sudo apt install -y python3 python3-pip

echo "[FUZZQR] Installing QRCode generator requirements"
pip install -r ../../fuzzqr/QRCodeGenerator/requirements.txt

echo "[FUZZQR] PYTHON INSTALLED"
