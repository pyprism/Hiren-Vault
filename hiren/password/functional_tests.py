from selenium import webdriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
import unittest


class Hiren(unittest.TestCase):
    binary = FirefoxBinary('./firefox_33.0/firefox')

    def setUp(self):
        self.browser = webdriver.Firefox(firefox_binary=self.binary)
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def test_index(self):
        self.browser.get('http://localhost:8000')
        self.assertIn('Hiren', self.browser.title)
        print(self.browser.title)
        self.fail('Finish title test')


if __name__ == '__main__':
    unittest.main(warnings='ignore')