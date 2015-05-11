# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Password',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, primary_key=True, verbose_name='ID')),
                ('tags', models.CharField(max_length=30, blank=True, null=True)),
                ('site_url', models.URLField()),
                ('username', models.CharField(max_length=200, blank=True, null=True)),
                ('email', models.EmailField(max_length=200, blank=True, null=True)),
                ('password', models.CharField(max_length=500)),
                ('note', models.TextField(blank=True, null=True)),
                ('added_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Recent',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, primary_key=True, verbose_name='ID')),
                ('obj', models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]
