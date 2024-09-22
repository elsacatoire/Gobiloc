# api/models/category_model.py

from django.db.models import CharField, Model


class Category(Model):
    """
    Represents a category entity in the database.

    Attributes:
        name (CharField): The name of the category with a maximum length of 50 characters.
    """

    name = CharField(max_length=50)
