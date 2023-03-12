# QR Code Generator

This program generates and shows QR codes with malicious payloads.

## Usage

1. Move inside this folder with the terminal
2. Execute `python main.py [options]`

### Requirements

- Python (3.9+) and PIP
  - For the first time, run `pip install -r requirements.txt` to install all the mandatory dependencies
  - Install tkinter using: `sudo apt-get install python3-tk`

## Structure

- `words/`: collection of dictionaries; each word is listed inside a single line.

## Extend the tool

### QR Builder example

This is an example on how to add new applications support.

```python
# [Edit file] qr_builder.py
class qrbuilder:

    def standard(payload: str):
        return payload

    def myapplication(payload: str):
        # Return custom payload
        pass
```

```python
# [Edit file] qr_gen.py
app_names = {
    "standard" : qrbuilder.standard,
    "myapp" : qrbuilder.myapplication,
    # ...
}
```

```sh
# Type in a terminal
python main.py -a myapp
```
