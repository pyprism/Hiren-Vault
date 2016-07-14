from django.db import models


class Vault(models.Model):
    site_url = models.URLField(max_length=600)
    username = models.CharField(max_length=500, null=True)
    email = models.CharField(max_length=500, null=True)
    password = models.CharField(max_length=500)
    note = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tag = models.ForeignKey('Tag', null=True)


class Tag(models.Model):
    name = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Recent(models.Model):
    vault = models.ForeignKey(Vault, on_delete=models.CASCADE)
    accessed_at = models.DateTimeField(auto_now=True)


class Secret(models.Model):
    key = models.CharField(max_length=500)


