#!/bin/bash


echo "[FUZZQR] Install python and pip"
sudo apt update -y
sudo apt install -y python3 python3-pip

echo "[FUZZQR] Install QRCode generator requirements"
pip install -r ../../fuzzqr/QRCodeGenerator/requirements.txt

