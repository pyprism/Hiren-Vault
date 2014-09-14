__author__ = 'prism'
from django.utils.crypto import get_random_string

secret_file = open('secret.txt', 'w')
blah_blah = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
secret_file.write(get_random_string(50, blah_blah))
secret_file.close()
