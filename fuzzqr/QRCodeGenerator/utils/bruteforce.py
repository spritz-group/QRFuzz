from __future__ import annotations
from base64 import b64decode
from optparse import OptionParser
from cose.messages import Sign1Message, CoseMessage
from cose.headers import Algorithm, KID
from cose.algorithms import Es256
from cose.keys import EC2Key
from cryptography.hazmat.backends.openssl.ec import _EllipticCurvePublicKey
from cryptography.hazmat.primitives.serialization import load_der_public_key
from concurrent.futures import (ThreadPoolExecutor, FIRST_COMPLETED, as_completed as completed_futures, wait as wait_futures)

DEFAULT_KID = "53FOjX/4aJs="      #kid FR
DEFAULT_PUBK = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEgu/WJBn1Q+RCOfQx3NLT5oIGUCHsqSRXuu7EZsqfqZN5PvHk6/E++88wvj2fMrfmAptk5tVld2xBH4P4tRs8JQ=="

class EncodedPoint:
    def __init__(self, xy: tuple) -> None:
        self.x, self.y = xy[0], xy[1]

    @staticmethod
    def from_public_key(pubkey: _EllipticCurvePublicKey) -> EncodedPoint:
        return EncodedPoint((
            pubkey.public_numbers().x.to_bytes(32, 'big'),
            pubkey.public_numbers().y.to_bytes(32, 'big')
        ))

class Recovery:
    def __init__(self, b64_kid: str,
                      ec_point: EncodedPoint,
                      verbose: bool = False) -> None:
        self.pubk_ec_point = ec_point
        self.pubk_id = b64decode(b64_kid)
        self.print_k = lambda k: print(k.d.hex()) if verbose else lambda _: None

    def run(self) -> bytes:
        while 1:
            private_k = self.generate_key()
            self.print_k(private_k)

            k_is_valid = self.verify_signature(
                ec_point=self.pubk_ec_point,
                encoded_message=self.sign_message(self.pubk_id, private_k, 'This is a test message')
            )
            if k_is_valid:
                return private_k.d

    @staticmethod
    def generate_key() -> EC2Key:
        return EC2Key.generate_key(crv='P_256', optional_params={'ALG': 'ES256'})

    @staticmethod
    def sign_message(kid: str, private_key: EC2Key, message: str) -> bytes:
        msg = Sign1Message(
            phdr={KID: kid, Algorithm: Es256},
            payload=message.encode('utf-8')
        )
        msg.key = private_key
        return msg.encode()

    @staticmethod
    def verify_signature(ec_point: EncodedPoint, encoded_message: bytes) -> bool:
        msg = CoseMessage.decode(encoded_message)
        msg.key = EC2Key(
            crv='P_256',
            x=ec_point.x,
            y=ec_point.y,
            optional_params={'ALG': 'ES256'}
        )
        return msg.verify_signature()

    @staticmethod
    def log_once(private_key: bytes) -> None:
        with open('ec_key.txt', 'w') as out:
            out.write(private_key.hex())

def main():
    parser = OptionParser()
    parser.add_option('-t', '--tasks', dest='TASKS', type='int', default=1,
                            help='number of tasks in parallel (default: 1)')
    parser.add_option('-v', '--verbose', dest='VERBOSE', action='store_true',
                            default=False, help='print generated keys')
    parser.add_option('-k', '--kid', dest='KID', default=DEFAULT_KID,
                            help='key ID in BASE64 format')
    parser.add_option('-p', '--public-key', dest='PUBK', default=DEFAULT_PUBK,
                            help='public key in DER format')
    (options, _) = parser.parse_args()

    recovery = Recovery(options.KID,
        EncodedPoint.from_public_key( load_der_public_key(b64decode(options.PUBK)) ),
        verbose=options.VERBOSE
    )
    with ThreadPoolExecutor(max_workers=options.TASKS) as executor:
        results = [executor.submit(recovery.run) for _ in range(options.TASKS)]
        wait_futures(results, return_when=FIRST_COMPLETED)
        for future in completed_futures(results):
            private_key = future.result()
            if private_key:
                recovery.log_once(private_key)
            else:
                executor.shutdown(wait=False, cancel_futures=True)

if __name__ == '__main__':
    main()