# Generated by Django 5.0.4 on 2024-04-16 02:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userauths', '0002_alter_profile_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='otp',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]