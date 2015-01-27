from django.test import TestCase
from django.core.urlresolvers import resolve
from .views import index
# Create your tests here.


class HomePageTest(TestCase):

    def test_root_url_resolve_to_index_view(selfs):
        found = resolve('/')
        selfs.assertEqual(found.func, index)