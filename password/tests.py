from django.test import TestCase
import unittest
from selenium import webdriver
from django.core.urlresolvers import resolve
from .views import login, browse
from django.http import HttpRequest
# Create your tests here.


class LoginFunctionalTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def test_login_page(self):
        self.browser.get('http://localhost:8000')

        self.assertIn('Hiren->Login', self.browser.title)
       # self.fail('Finish the test')

#class LoginPageTest(TestCase):

#    def test_root_url_resolves_to_login_page(self):
#        found = resolve('/')
#        self.assertEqual(found.func, Login)


class HomePageTest(TestCase):

    def test_root_url_resolves_to_homepage(self):
        found = resolve('/')
        self.assertEqual(found.func, login)

    def test_home_page_returns_correct_html(self):
        request = HttpRequest()
        response = login(request)
        self.assertTrue(response.content.startswith(b'<!DOCTYPE html>'))
        self.assertIn(b'<title>Hiren->Login</title>', response.content)
        self.assertTrue(response.content.endswith(b'</html>'))

