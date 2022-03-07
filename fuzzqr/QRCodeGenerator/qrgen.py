#
# QrGen
# --------------------

import qrcode
import subprocess
from qr_builder import *

# TODO: code-refactoring: remove lists and fuzz-type; we are going to have just one file for everything


lists = [
    "words/sqli.txt",
    "words/xss.txt",
    "words/cmdinj.txt",
    "words/formatstr.txt",
    "words/xxe.txt",
    "words/strfuzz.txt",
    "words/ssi.txt",
    "words/lfi.txt",
    "words/json.txt",
    "words/metachars.txt",
    "naughty-strings.txt",
    "special-chars.txt",
    "words/test.txt" # for testing purpose
]

fuzz_type = {
    0 : "Test", # for testing purpose
    1 : "SQL_Injections",
    2 : "XSS",
    3 : "Command_Injection",
    4 : "Format_String",
    5 : "XXE",
    6 : "String_Fuzzing",
    7 : "SSI_Injection",
    8 : "LFI_Directory_Traversal",
    9 : "Metachars",
    10: "Naughty_strings",
    11: "Special_Chars",
    12: "JSON"
}

# TODO: add enum of top apps from excel

app_names = {
    # (string) : function_callback
    # ----------- IT
    "wallapop" : qrbuilder.wallpop,
    "tiktok" : qrbuilder.tiktok,
    "satispay" : qrbuilder.satispay,
    "posteid" : qrbuilder.posteid,
    "telegram" : qrbuilder.telegram,
    "zoom" : qrbuilder.zoom,
    "qrbarcodereader" : qrbuilder.qrbarcodereader,
    "io" : qrbuilder.io,
    "shein" : qrbuilder.shein,
    # ----------- US
    "instagram" : qrbuilder.instagram,
    "snapchat" : qrbuilder.snapchat,
    "paypal" : qrbuilder.paypal,
}


def make_dirs():
    try:
        subprocess.check_output(["mkdir", "genqr"], stderr=subprocess.STDOUT)
        print("Payload path generated..")
    except:
        pass
    try:
        subprocess.check_output(["rm", "genqr/*"], stderr=subprocess.STDOUT)
        print("Clearing QR payloads dir..")
    except:
        pass


def get_words(opt):
    if opt.list != None:
        payloads = open(lists[opt.list]).readlines()
    elif opt.wordlist != None:
        payloads = open(str(opt.wordlist)).readlines()
    payloads = [w.strip() for w in payloads]
    return payloads


def print_qrs(payload, t, i):
    img = qrcode.make(payload)
    img.save(f"genqr/{t}-{i}.png")
    print(f"Generated {i} payloads!")
