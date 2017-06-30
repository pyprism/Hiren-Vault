from django.test import TestCase, TransactionTestCase
from .models import Recent, Vault
from django.utils import timezone
from rest_framework.test import APIRequestFactory, APIClient
from django.contrib.auth.models import User
from contextlib import contextmanager
import datetime
from django.utils import timezone


class ModelTest(TransactionTestCase):
    """
    Test all models
    """
    reset_sequences = True

    def setUp(self):
        vault = Vault.objects.create(site_url='http://xyz.com', username='prism',
                                     email='a@x.com', password='1234', note='note',
                                     title='title', iv='sdfc', salt='sasasa', iteration=2)
        Recent.objects.create(vault=vault)

    def test_vault_model(self):
        vault_items = Vault.objects.all()
        self.assertEqual(vault_items.count(), 1)
        self.assertEqual(vault_items[0].site_url, 'http://xyz.com')
        self.assertEqual(vault_items[0].username, 'prism')
        self.assertEqual(vault_items[0].email, 'a@x.com')
        self.assertEqual(vault_items[0].password, '1234')
        self.assertEqual(vault_items[0].note, 'note')

    def test_recent_model(self):
        recent_items = Recent.objects.all()
        self.assertEqual(recent_items.count(), 1)
        self.assertEqual(recent_items[0].vault.id, 1)


# class VaultViewSetTest(TransactionTestCase):
#     """
#     Test Vault viewset
#     """
#     reset_sequences = True

#     def setUp(self):
#         self.client = APIClient()
#         field = Vault._meta.get_field('created_at')
#         mock_now = lambda: datetime.datetime(2010, 1, 1)
#         self.user = User.objects.create_user('hiren', 'a@b.com', 'password')
#         self.client.force_authenticate(user=self.user)
#         self.tag = Tag.objects.create(name='tag object')
#         #with patch.object(field, 'default', new=mock_now):
#         dt = timezone.now()
#         with patch('django.utils.timezone.now', return_value=dt):
#             vault = Vault.objects.create(site_url='http://xyz.com', username='prism',
#                 email='a@x.com', password='1234', note='note', tag=self.tag)

#     def test_login_works(self):
#         response = self.client.get('/api/vault/')
#         self.assertEqual(response.status_code, 200)

#         self.client.logout()
#         response = self.client.get('/api/vault/')
#         self.assertEqual(response.status_code, 403)

#     def test_return_correct_item(self):  # todo learn mockg
#         response = self.client.get('/api/vault/1/')
#         #self.assertEqual(response.json(), {'site_url': 'http://xyz.com', 'username': 'prism',
#         #                                  'email': 'a@x.com', 'password': '1234', 'note': 'note', 'tag': self.tag})

#     def test_item_update_works(self):
#         response = self.client.patch('/api/vault/1/', {'username': 'bunny'})
#         #self.assertEqual(response.json(), {'site_url': 'http://xyz.com', 'username': 'bunny',
#         #                                  'email': 'a@x.com', 'password': '1234', 'note': 'note', 'tag': self.tag})
#         print(response.json())


# class SecretViewTest(TransactionTestCase):
#     """
#     Test Secret View
#     """
#     reset_sequences = True

#     def setUp(self):
#         self.client = APIClient()
#         self.user = User.objects.create_user('hiren', 'a@b.com', 'password')
#         self.client.force_authenticate(user=self.user)

#     def test_login_works(self):
#         response = self.client.get('/api/secret/')
#         self.assertEqual(response.status_code, 404)

#         self.client.logout()
#         response = self.client.get('/api/secret/')
#         self.assertEqual(response.status_code, 403)

#     def test_return_correct_secret_object(self):
#         Secret.objects.create(key="secret key")
#         response = self.client.get('/api/secret/')
#         self.assertEqual(response.json(), [{'id': 1, 'key': 'secret key'}])

#     def test_deleting_secret_object_fail(self):
#         Secret.objects.create(key="secret key")
#         response = self.client.delete('/api/secret/1/')
#         self.assertEqual(response.status_code, 403)

#     def test_creating_second_object_fail(self):
#         Secret.objects.create(key="secret key")
#         response = self.client.post('/api/secret/', data={'key': "bunny"})
#         self.assertEqual(response.status_code, 403)

#     def test_secret_key_update_works(self):
#         Secret.objects.create(key="secret key")
#         response = self.client.patch('/api/secret/1/', data={'key': 'new key'})
#         self.assertEqual(response.json(), {'id': 1, 'key': 'new key'})

#     def test_return_404_on_empty_database(self):
#         response = self.client.get('/api/secret/')
#         self.assertEqual(response.status_code, 404)

#     def test_key_creation_works(self):
#         response = self.client.post('/api/secret/', data={'key': 'bunny'})
#         self.assertEqual(response.status_code, 201)
