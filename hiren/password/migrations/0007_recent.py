# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('password', '0006_auto_20141015_2137'),
    ]

    operations = [
        migrations.CreateModel(
            name='Recent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('obj', models.ForeignKey(to='password.Password')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
