from Crypto.Cipher import AES
import hashlib


def pad(s):
    return s + ((16-len(s) % 16) * "{")


def digest(key):
    m = hashlib.sha256()
    m.update(str.encode(key))
    return m.digest()


def encrypt(plantext, key):
    cipher = AES.new(digest(key))
    return cipher.encrypt(pad(plantext))


def decrypt(ciphertext, key):
    cipher = AES.new(digest(key))
    print(cipher.decrypt(ciphertext))
    dec = cipher.decrypt(ciphertext).decode('utf-8')
    l = dec.count('{')
    return dec[:len(dec)-l]

x = encrypt("hello", "@##4edff")
print(x)
print(decrypt(x, "nothing"))