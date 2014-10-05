# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('password', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='password',
            name='email',
            field=models.EmailField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='password',
            name='note',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='password',
            name='password',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='password',
            name='tags',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='password',
            name='username',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
