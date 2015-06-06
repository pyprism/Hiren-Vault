__author__ = 'prism'
__date__ = '5th June, 2015'

from django.contrib.auth.models import User
from selenium import webdriver
import unittest
import time
import os
from django.test import LiveServerTestCase


class LoginFunctionalTest(LiveServerTestCase):

    def setUp(self):
        if 'TRAVIS' in os.environ:
            username = os.environ.get('SAUCE_USERNAME', "pyprism")
            access_key = os.environ.get('SAUCE_ACCESS_KEY', "")
            sauce_url = "http://%s:%s@ondemand.saucelabs.com:80/wd/hub"
            self.driver = webdriver.Remote(
                desired_capabilities=self.desired_capabilities,
                command_executor=sauce_url % (username, access_key)
            )
            self.driver.implicitly_wait(30)
        else:
            self.browser = webdriver.Firefox()
            self.browser.implicitly_wait(3)
            # self.browser.get('http://localhost:8000')

    def tearDown(self):
        self.browser.quit()

    def test_login_page(self):
        self.browser.get(self.live_server_url)

        self.assertIn('Hiren->Login', self.browser.title)

    def test_login_form(self):
        self.browser.get(self.live_server_url)
        user = User.objects.create_superuser('testHiren', 'myemail@test.com', 'testPass')
        user.save()
        username = self.browser.find_element_by_id('username-id')
        password = self.browser.find_element_by_id('password-id')
        submit = self.browser.find_element_by_id('login-button')
        username.send_keys('testHiren')
        password.send_keys('testPass')
        submit.click()
        #time.sleep(10)
        location = self.browser.current_url
        self.assertEqual(self.live_server_url + '/dashboard', location)

