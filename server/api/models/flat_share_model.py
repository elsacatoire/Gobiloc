# api/models/flat_share_model.py

from django.db.models import CharField, Model


class FlatShare(Model):
    """
    Represents a flat share entity in the database.

    Attributes:
        name (CharField): The name of the flat share with a maximum length of 50 characters.
        description (CharField): A brief description of the flat share with a maximum length of 255 characters.
                                 This field is optional and can be null.
    """

    name = CharField(max_length=50)
    description = CharField(max_length=255, null=True)
