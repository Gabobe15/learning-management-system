# Generated by Django 4.2.7 on 2024-04-29 09:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_completelesson_completedlesson'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cartorderitem',
            old_name='initial_amount',
            new_name='initial_total',
        ),
    ]