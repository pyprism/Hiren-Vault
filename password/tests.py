from django.test import TestCase
import unittest
from selenium import webdriver
from django.core.urlresolvers import resolve
from .views import login, browse
from django.template.loader import render_to_string
from django.http import HttpRequest
from django.contrib.auth.models import User
from .models import Password, Tag
import os
import time
from password import crypto
from selenium.webdriver.common.keys import Keys
from django.utils import timezone
# Create your tests here.



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

    def test_home_page_returns_correct_template(self):
        request = HttpRequest()
        response = login(request)
        expected_html = render_to_string('index.html')
        self.assertEqual(response.content.decode(), expected_html)


class ModelTest(TestCase):

    def setUp(self):
        passwd = Password.objects.create(site_url='https://hiren.lol', username='hiren', email='hiren@hiren.com',
                                         password='secretPass', note='my_note', added_at=timezone.now())
        Tag.objects.create(password=passwd, tags='test Tag')

    def test_password_model(self):
        passwd_items = Password.objects.all()
        self.assertEqual(passwd_items.count(), 1)

        pass_result =Password.objects.get(email='hiren@hiren.com')
        self.assertEqual(pass_result.email, 'hiren@hiren.com')

    def test_tag_model(self):
        tags_item = Tag.objects.all()
        self.assertEqual(tags_item.count(), 1)

        tags_result = Tag.objects.get(tags='test Tag')
        self.assertEqual(tags_result.tags, 'test Tag')

        pass_id = Password.objects.get(email='hiren@hiren.com')
        self.assertEqual(tags_result.password, pass_id)
