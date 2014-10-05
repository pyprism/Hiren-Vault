from django.db import models

# Create your models here.


class Password(models.Model):
    tags = models.CharField(max_length=30, blank=True, null=True)
    site_url = models.URLField(max_length=200)
    username = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(max_length=200, blank=True, null=True)
    password = models.CharField(max_length=500)
    note = models.TextField(blank=True, null=True)
    added_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return '%s %s' % (self.site_url, self.password)