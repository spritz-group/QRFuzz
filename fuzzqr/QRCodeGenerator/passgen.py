#
# Green Pass generator
# --------------------


from zlib import compress
from binascii import unhexlify

from base45 import b45encode
from flynn import encoder as flynn_encoder
from flynn import decoder as flynn_decoder
from cose.messages import Sign1Message
from cose.headers import Algorithm, KID
from cose.algorithms import EdDSA
from cose.keys.curves import Ed25519
from cose.keys import OKPKey
from base64 import b64decode
from datetime import *

PRIVKEY = b"9d370d925476752486ab0e4a8e088228e493da12d1586fafae9f35880dbcfe03"
HEADER = b""

# --- Legend GP types ---
# t = tested
# v = vax
# r = recovery
# -----------------------



# TODO: test with current today date

yesterday = datetime.timestamp(datetime.now()) - 86400
tomorrow = datetime.timestamp(datetime.now()) + (7 * 86400)

def get_pass(data: str):
    return {
            4: 1683849600,
            6: 1635501173,
            1: "IT",
            -260: {
                1: {
                    "t": [
                        {
                            "sc": "2022-01-018T11:40:00+02:00",
                            "ma": "1268",
                            "tt": "LP217198-3",
                            "co": "IT",
                            "tc": "PINCOPALLO SRL",
                            "ci": "01ITFF9EECC5890441F5AC77BA97A5577C22#6",
                            "is": "Ministero della Salute",
                            "tg": "840539006",
                            "tr": "260415000",
                        }
                    ],
                    "nam": {
                        "fnt": data,
                        "fn": data,
                        "gnt": data,
                        "gn": data,
                    },
                    "ver": "1.3.0",
                    "dob": "2022-01-32",
                }
            },
        }


def get_cose(data):
    return Sign1Message(
        phdr={Algorithm: EdDSA, KID: b64decode("NJpCsMLQco4=")}, payload=flynn_encoder.dumps(data)
    )


def add_cose_key(msg, privkey):
    privkey = unhexlify(privkey)
    key = OKPKey(crv=Ed25519, d=privkey, optional_params={"ALG": "EDDSA"})
    msg.key = key
    return msg


def flynn(signed_encoded, header=b""):
    (_, (header_1, header_2, cbor_payload, sign)) = flynn_decoder.loads(signed_encoded)
    if header:
        header_1 = header
    return flynn_encoder.dumps((header_1, header_2, cbor_payload, sign))


def b45(msg):
    return b45encode(compress(msg))
