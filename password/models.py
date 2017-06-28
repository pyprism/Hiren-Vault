from django.db import models
from taggit.managers import TaggableManager


class Vault(models.Model):
    title = models.TextField()
    site_url = models.TextField()
    username = models.TextField(null=True)
    email = models.TextField(null=True)
    password = models.TextField()
    note = models.TextField(null=True)
    iv = models.TextField()
    salt = models.TextField()
    iteration = models.IntegerField()
    tag = TaggableManager()
    audit = models.BooleanField(default=True)
    icon = models.TextField(null=True)
    history = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Recent(models.Model):
    vault = models.ForeignKey(Vault, on_delete=models.CASCADE)
    accessed_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
