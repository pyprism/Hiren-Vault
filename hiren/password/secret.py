from Crypto.Cipher import AES
import hashlib
import base64


class Secret:
    def pad(self, s):
        return s + ((16-len(s) % 16) * "{")

    def digest(self, key):
        m = hashlib.sha256()
        m.update(str.encode(key))
        return m.digest()

    def encrypt(self, plaintext, key):
        cipher = AES.new(self.digest(key))
        return base64.b64encode(cipher.encrypt(self.pad(plaintext)))

    def decrypt(self, ciphertext, key):
        cipher = AES.new(self.digest(key))
        try:
            dec = cipher.decrypt(base64.b64decode(ciphertext)).decode('utf-8')
            l = dec.count('{')
            return dec[:len(dec)-l]
        except UnicodeDecodeError:  # When the password is wrong
            return False