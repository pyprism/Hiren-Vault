__author__ = 'prism'
# date 27, May 2015 10.35am

from Crypto.Cipher import AES
import hashlib
import base64

class Secret:

    def __init__(self, key):
        self.key = key

    def pad(self, s):
        return s + ((16-len(s) % 16) * "{")

    def digest(self, key):
        m = hashlib.sha256()
        m.update(str.encode(key))
        return m.digest()

    def encrypt(self, plaintext):
        cipher = AES.new(self.digest(self.key))
        return base64.b64encode(cipher.encrypt(self.pad(plaintext)))

    def decrypt(self, ciphertext):
        cipher = AES.new(self.digest(self.key))
        try:
            dec = cipher.decrypt(base64.b64decode(ciphertext)).decode('utf-8')
            l = dec.count('{')
            return dec[:len(dec)-l]
        except UnicodeDecodeError:  # When the password is wrong
            return False

