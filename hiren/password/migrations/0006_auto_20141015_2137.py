# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('password', '0005_recent'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recent',
            name='used',
        ),
        migrations.DeleteModel(
            name='Recent',
        ),
    ]
