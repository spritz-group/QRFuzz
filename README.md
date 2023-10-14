# QRFuzz

A fuzzing toolkit to test malicious QR Codes in mobile applications.

![QRFuzz banner](docs/images/qrfuzz-banner.png)

**Current release**: v1.0.1 (2023-03-16)

You can find toolkit updates in the [CHANGELOGS](CHANGELOGS.md) page.

## Installation

All the instructions to install the toolkit are inside the [docs / installation](docs/installation.md) page.

## Usage

All the instructions to use the toolkit are inside the [docs / usage](docs/usage.md) page.

## Quick Start

1. Connect an Android Smartphone to a PC and type `adb devices`
    - Save the `udid` (`device_id`) of the device
2. Open a new terminal and start Appium
    - `appium -p 4723`
3. Open a new terminal and start QRCodeGenerator
    - `cd tools/QRCodeGenerator`
    - `python main.py -a <app> -j <json_data_path> -p <position>`
4. Open a new terminal and start QRCodeFuzzer
    - `cd tools/QRCodeFuzzer`
    - `node index.js <app> <data_path> <port> <device_id>`
5. Once the tests are completed, check the results inside the test directory
    - `ls tools/QRCodeFuzzer/data-tests/<app_name>`

## Extend the tool

You can find example on how to extend the tool inside the folder of each tool.

- [QRCodeFuzzer](tools/QRCodeFuzzer/README.md)
- [QRCodeGenerator](tools/QRCodeGenerator/README.md)

## Credits

This project has been developed by students from the University of Padua (UniPD, Italy).

- Federico Carboni
- Denis Donadel
- Mariano Sciacco

If you're using our tool, please cite our paper: 
```
@inproceedings{carboni2023if,
  title={If You’re Scanning This, It’s Too Late! A QR Code-Based Fuzzing Methodology to Identify Input Vulnerabilities in Mobile Apps},
  author={Carboni, Federico and Conti, Mauro and Donadel, Denis and Sciacco, Mariano},
  booktitle={International Conference on Applied Cryptography and Network Security},
  pages={553--570},
  year={2023},
  organization={Springer}
}
```

