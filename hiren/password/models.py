from django.db import models

# Create your models here.


class Password(models.Model):
    tags = models.CharField(max_length=30)
    site_url = models.URLField(max_length=200)
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=200)
    password = models.CharField(max_length=300)
    added_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True)