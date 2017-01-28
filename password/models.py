from django.db import models
from taggit.managers import TaggableManager


class Vault(models.Model):
    site_url = models.TextField()
    username = models.TextField(null=True)
    email = models.TextField(null=True)
    password = models.TextField()
    note = models.TextField(null=True)
    iv = models.CharField(max_length=500)
    salt = models.CharField(max_length=1000)
    tag = TaggableManager()
    history = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Recent(models.Model):
    vault = models.ForeignKey(Vault, on_delete=models.CASCADE)
    accessed_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class PasswordFieldHistory(models.Model):
    vault = models.ForeignKey(Vault, on_delete=models.CASCADE)
    password = models.TextField()
    iv = models.CharField(max_length=500)
    salt = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)