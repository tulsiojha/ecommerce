# Generated by Django 3.2.7 on 2021-10-12 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_cart_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='totalPrice',
            field=models.FloatField(default=0),
        ),
    ]
