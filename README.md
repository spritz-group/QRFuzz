# QRFuzz

> This is a PRIVATE repository. Before making any of this content public, please contact the authors.

A fuzzing toolkit to test malicious QR Codes in Mobile Applications

![QRFuzz banner](docs/images/qrfuzz-banner.png)

### Current release

> **Latest release**: v1.0.0 (2023-03-12)

You can find changelogs in the releases page of the Github project.

## Installation

In order to install this toolkit you must follow the instructions inside `script/readme.md` file.

## Usage

### Script-assisted

Read the instructions in `script/readme.md`.

### Manual

> Using a terminal, type `adb devices` to get `udid` of the devices. Replace `device_name` with the desired `udid`.

1. Start `appium -p 4723` in a terminal (in background)
2. In a different terminal, Start a bash script with `python main.py -a <app> -j <json_data_path> -p <left/right/center> -sf <optional:start_position>` in another terminal
3. Start a bash script with `node index.js <app> <data_path> <port> <device_name> <optional:start_position>` in a different terminal

## Credits

This project has been made by students from the University of Padua.

- Federico Carboni
- Denis Donadel
- Mariano Sciacco