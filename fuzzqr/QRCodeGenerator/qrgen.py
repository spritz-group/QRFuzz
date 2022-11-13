#
# QrGen
# --------------------

import os
from typing import List
import qrcode
import subprocess
from qr_builder import *

# TODO: code-refactoring: remove lists and fuzz-type; we are going to have just one file for everything

# Get files from `words` folder
word_file_names = [f.split(".txt")[0] for f in os.listdir("words")]
word_files = [f"words/{f}.txt" for f in word_file_names]

fuzz_type = list(zip(range(len(word_file_names)), word_file_names))


# TODO: add enum of top apps from excel

app_names = {
    # (string) : function_callback
    "standard" : qrbuilder.standard,
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
    "whatsapp" : qrbuilder.whatsapp,
    "snapchat" : qrbuilder.snapchat,
    "paypal" : qrbuilder.paypal,
    "twitter" : qrbuilder.twitter,
    "discord" : qrbuilder.discord,
    "ebay" : qrbuilder.ebay,
    "postepay" : qrbuilder.postepay,
    "bancoposta" : qrbuilder.bancoposta,
    "ucbrowser" : qrbuilder.ucbrowser,
    "broadlink" : qrbuilder.broadlink,
    "facebook" : qrbuilder.facebook,
    "verificac19" : qrbuilder.verificac19,
    "chrome" : qrbuilder.chrome,
    "messages" : qrbuilder.messages, 
    "instagram260" : qrbuilder.instagram260,
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
        payloads = open(word_files[opt.list]).readlines()
    elif opt.wordlist != None:
        payloads = open(str(opt.wordlist)).readlines()
    payloads = [w.strip() for w in payloads]
    return payloads


def print_qrs(payload, t, i):
    img = qrcode.make(payload)
    img.save(f"genqr/{t}-{i}.png")
    print(f"Generated {i} payloads!")
