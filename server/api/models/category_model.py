# api/models/category_model.py

from django.db.models import CharField, Model


class Category(Model):
    name = CharField(max_length=50)
