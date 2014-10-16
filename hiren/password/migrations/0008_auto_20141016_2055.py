# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('password', '0007_recent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recent',
            name='obj',
            field=models.IntegerField(null=True, blank=True),
        ),
    ]
