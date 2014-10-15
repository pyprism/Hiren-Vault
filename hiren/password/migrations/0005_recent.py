# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('password', '0004_auto_20141011_1132'),
    ]

    operations = [
        migrations.CreateModel(
            name='Recent',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('used', models.ForeignKey(to='password.Password')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
