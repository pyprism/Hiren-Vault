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
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('tags', models.CharField(blank=True, max_length=30)),
                ('site_url', models.URLField()),
                ('username', models.CharField(blank=True, max_length=100)),
                ('email', models.EmailField(blank=True, max_length=200)),
                ('password', models.CharField(max_length=300)),
                ('note', models.TextField(blank=True)),
                ('added_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
