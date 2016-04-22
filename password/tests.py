from django.test import TestCase, TransactionTestCase
from .models import Tag, Recent, Vault
from django.utils import timezone
from rest_framework.test import APIRequestFactory, APIClient
from django.contrib.auth.models import User


class ModelTest(TransactionTestCase):
    """
    Test all models
    """
    reset_sequences = True

    def setUp(self):
        tag = Tag.objects.create(name='tag object')
        vault = Vault.objects.create(site_url='http://xyz.com', username='prism',
                                     email='a@x.com', password='1234', note='note', tag=tag)
        Recent.objects.create(vault=vault)

    def test_tag_model(self):
        tag_item = Tag.objects.all()
        self.assertEqual(tag_item.count(), 1)

        tag_result = Tag.objects.get(name="tag object")
        self.assertEqual(tag_result.name, "tag object")

    def test_vault_model(self):
        vault_items = Vault.objects.all()
        self.assertEqual(vault_items.count(), 1)
        self.assertEqual(vault_items[0].site_url, 'http://xyz.com')
        self.assertEqual(vault_items[0].username, 'prism')
        self.assertEqual(vault_items[0].email, 'a@x.com')
        self.assertEqual(vault_items[0].password, '1234')
        self.assertEqual(vault_items[0].note, 'note')
        self.assertEqual(vault_items[0].tag.id, 1)

    def test_recent_model(self):
        recent_items = Recent.objects.all()
        self.assertEqual(recent_items.count(), 1)
        self.assertEqual(recent_items[0].vault.id, 1)