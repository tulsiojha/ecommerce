from django.contrib.auth.models import User
from django.db import models
from django.db.models import TextField, IntegerField, FloatField, URLField, ForeignKey
from django_mysql.models import ListTextField
from django.conf import settings

class Product(models.Model):
    name = TextField()
    description = TextField()
    sellingPrice = FloatField()
    marketPrice = FloatField()
    stocks = IntegerField()
    cover = TextField()
    images = ListTextField(
        base_field=URLField())

class Cart(models.Model):
    user = ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    product = ForeignKey(Product, on_delete=models.DO_NOTHING)
    quantity = IntegerField(default=1)

