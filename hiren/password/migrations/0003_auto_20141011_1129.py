# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('password', '0002_auto_20141005_2120'),
    ]

    operations = [
        migrations.AlterField(
            model_name='password',
            name='password',
            field=models.BinaryField(),
        ),
    ]
