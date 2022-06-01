## Fake Green Pass Generator

This program aims to generate or visualize QR codes of fake green pass with malicious payloads. The payload is generated from dictionaries inside the `words/` folder of this project. Moreover, we can easily change payloads from the python script, as well as type of injection directly as an option from the terminal.


### Installation and Requirements

- Python 3.9+ and `pip`
    - For the first time run `pip install -r requirements.txt` to install all the mandatory dependencies
- Install also tkinter using: `sudo apt-get install python3-tk`

### Usage

1. Move inside this folder with the terminal

#### QR Code Visualizer

2. Execute `python main-display.py -l <wordlist-number>` (single wordlist) or `python main-display.py -a` (all wordlists)

> From here, the QR code will change accordingly to the execution of the Appium Client.

#### QR Code Generator

2. Execute `python main-generator.py -l <wordlist-number>` (single wordlist) or `python main-generator.py -w <path-to-custom-wordlist>` (custom wordlist)


### Development

You can import `passgen.py` and `qrgen.py` as modules for other main scripts depending on your needs.

### Credits

**Original credits to h0nus/QRGen** for the QR code generation part of malformed payloads made using a dictionary. 
Edited version made by @Maxelweb (Mariano Sciacco) and @Kero2375 (Federico Carboni) for Advanced Topics in Computer and Network Security @ UniPD (2021-22).
