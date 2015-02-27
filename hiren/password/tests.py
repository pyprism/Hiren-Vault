from django.test import TestCase
from django.core.urlresolvers import resolve
from django.http import HttpRequest
from .views import index
# Create your tests here.


class HomePageTest(TestCase):

    def test_root_url_resolve_to_index_view(self):
        found = resolve('/')
        self.assertEqual(found.func, index)

    def test_home_page_return_correct_html(self):
        request = HttpRequest()
        response = index(request)
        self.assertTrue(response.content.startswith(b'<html>'))