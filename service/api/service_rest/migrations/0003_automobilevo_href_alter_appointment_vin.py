# Generated by Django 4.0.3 on 2023-07-26 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_appointment_remove_sale_automobile_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='href',
            field=models.CharField(default=None, max_length=100, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='appointment',
            name='vin',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]