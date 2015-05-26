# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('password', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('tags', models.CharField(max_length=30, null=True, blank=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='password',
            name='tags',
        ),
        migrations.AddField(
            model_name='tag',
            name='password',
            field=models.ForeignKey(to='password.Password'),
        ),
    ]
