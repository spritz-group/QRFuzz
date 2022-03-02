#!/usr/bin/python3

# Copyright 2021 Tobias Girstmair (https://gir.st). Consider this code GPLv3
# licensed.

# pip3 install flynn base45 PyPDF2 pyzbar Pillow
# dnf install zbar || apt install libzbar0

import sys
import glob
import json
import zlib
import flynn
import base45
import PyPDF2
import os
from PIL import Image
from pyzbar import pyzbar
from datetime import datetime
from urllib.request import urlopen

sch = urlopen('https://raw.githubusercontent.com/ehn-dcc-development/ehn-dcc-schema/release/1.3.0/DCC.combined-schema.json')

if len(sys.argv) < 2:
    try:
        infile = glob.glob("COVID-19-*-*-*.pdf")[0]
        print(f"Warning: using file {found}, since not specified\n", file=sys.stderr)
    except:
        print(f"Usage: {sys.argv[0]} COVID-19-*-*-*.pdf", file=sys.stderr)
        print(f"Usage: {sys.argv[0]} QR_CODE.png", file=sys.stderr)
        print(f"Usage: {sys.argv[0]} 'HC1:.....'", file=sys.stderr)
        sys.exit(1)
else:
    if os.path.exists(sys.argv[1]):
        infile = sys.argv[1]
    else:
        infile = None
        qr_data_zlib_b45 = sys.argv[1]

if infile:
    if open(infile, "rb").read(4) == b"%PDF":
        # extract QR code from PDF using hard-coded index, size and bit depth.
        # This will only work with the official Austrian green pass PDFs.
        pdf=PyPDF2.PdfFileReader(open(infile, "rb"))
        qr_img = pdf.getPage(0)['/Resources']['/XObject']['/Im3']
        qr_pil = Image.frombytes("1", (400,400), qr_img.getData())
    else: # assume image
        qr_pil = Image.open(infile)

    # decode QR code into raw bytes:
    qr_data_zlib_b45 = pyzbar.decode(qr_pil)[0].data

# strip header ('HC1:') and decompress data:
qr_data_zlib = base45.b45decode(qr_data_zlib_b45[4:])
# decompress:
qr_data = zlib.decompress(qr_data_zlib)

# decode cose document:
(_, (headers1, headers2, cbor_data, signature)) = flynn.decoder.loads(qr_data)
# decode cbor-encoded payload:
data = flynn.decoder.loads(cbor_data)

date = lambda ts: datetime.utcfromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
print("QR Code Issuer :", data[1])
print("QR Code Expiry :", date(data[4]))
print("QR Code Generated :", date(data[6]))

print("raw data: ", data)

glb_schema = json.load(sch)

def annotate(data, schema, level=0):
    for key, value in data.items():
        description = schema[key].get('title') or schema[key].get('description') or key
        description, _, _ = description.partition(' - ')
        if type(value) is dict:
            print('  '*level, description)
            _, _, sch_ref = schema[key]['$ref'].rpartition('/')
            annotate(value, glb_schema['$defs'][sch_ref]['properties'], level+1)
        elif type(value) is list:
            print('  '*level, description)
            _, _, sch_ref = schema[key]['items']['$ref'].rpartition('/')
            for v in value:
                annotate(v, glb_schema['$defs'][sch_ref]['properties'], level+1)
        else: # value is scalar
            print('  '*level, description, ':', value)

annotate(data[-260][1], glb_schema['properties'])