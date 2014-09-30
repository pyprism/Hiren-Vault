from Crypto.Cipher import AES
import hashlib


# def pad(s):
#     return s + ((16-len(s) % 16) * "{")
#
#
# def digest(key):
#     m = hashlib.sha256()
#     m.update(str.encode(key))
#     return m.digest()
#
#
# def encrypt(plantext, key):
#     cipher = AES.new(digest(key))
#     return cipher.encrypt(pad(plantext))
#
#
# def decrypt(ciphertext, key):
#     cipher = AES.new(digest(key))
#     try:
#         dec = cipher.decrypt(ciphertext).decode('utf-8')
#         l = dec.count('{')
#         return dec[:len(dec)-l]
#     except UnicodeDecodeError:  # When the password is wrong
#         return False
#
# x = encrypt("hellossassasassssssssss#$%#TCrtc36fc4wfc4wq9fe", "@##4edff")
# print(x)
# print(decrypt(x, "@##4edff"))


class Crypt():
    def pad(self, s):
        return s + ((16-len(s) % 16) * "{")

    def digest(self, key):
        m = hashlib.sha256()
        m.update(str.encode(key))
        return m.digest()

    def encrypt(self, plaintext, key):
        cipher = AES.new(self.digest(key))
        return cipher.encrypt(pad(plaintext))

    def decrypt(self, ciphertext, key):
        cipher = AES.new(self.digest(key))
        try:
            dec = cipher.decrypt(ciphertext).decode('utf-8')
            l = dec.count('{')
            return dec[:len(dec)-l]
        except UnicodeDecodeError:  # When the password is wrong
         return False