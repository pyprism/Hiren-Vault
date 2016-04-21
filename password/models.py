from django.db import models


class Vault(models.Model):
    site_url = models.URLField(max_length=200)
    username = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=100, null=True)
    password = models.CharField(max_length=200)
    note = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Tag(models.Model):
    name = models.CharField(max_length=100)
    vault = models.ForeignKey('Vault', on_delete=models.CASCADE)


class Recent(models.Model):
    vault = models.ForeignKey(Vault, on_delete=models.CASCADE)
    accessed_at = models.DateTimeField(auto_now=True)