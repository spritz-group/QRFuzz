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

def get_pass(payload: str):
    return {payload}


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
    
def get_qr(p):
    msg = get_cose(get_pass(p))
    msg = add_cose_key(msg, PRIVKEY)
    msg = flynn(msg.encode(), HEADER)
    msg = b45(msg)
    msg = b"HC1:" + msg
    return msg