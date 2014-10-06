from Crypto.Cipher import AES
import hashlib


class Secret:
    def pad(self, s):
        return s + ((16-len(s) % 16) * "{")

    def digest(self, key):
        m = hashlib.sha256()
        m.update(str.encode(key))
        return m.digest()

    def encrypt(self, plaintext, key):
        cipher = AES.new(self.digest(key))
        return cipher.encrypt(self.pad(plaintext))

    def decrypt(self, ciphertext, key):
        cipher = AES.new(self.digest(key))
        try:
            dec = cipher.decrypt(ciphertext).decode('utf-8')
            l = dec.count('{')
            return dec[:len(dec)-l]
        except UnicodeDecodeError:  # When the password is wrong
            return False

# x = Crypt()
# y = x.encrypt("hello", "@##4edff")
# print(y)
# print(x.decrypt(y, "@##4edff"))