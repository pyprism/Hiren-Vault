from selenium import webdriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary

binary = FirefoxBinary('./firefox_33.0/firefox')
browser = webdriver.Firefox(firefox_binary=binary)
browser.get('http://localhost:8000')

assert 'Hiren' in browser.title