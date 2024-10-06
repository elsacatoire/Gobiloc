# api/models/todo_model.py

from django.db.models import (
    CASCADE,
    SET_NULL,
    CharField,
    DateTimeField,
    ForeignKey,
    Model,
)


class Todo(Model):
    """
    Represents a to-do entity in the database, linked to a specific flat share and category.

    Attributes:
        flat_share (ForeignKey): A foreign key linking the to-do to a FlatShare object. If the associated
                                 FlatShare is deleted, the to-do is also deleted due to the CASCADE behavior.
        name (CharField): The name or title of the to-do item with a maximum length of 50 characters.
        updateDate (DateTimeField): The date and time when the to-do was last updated. This field is automatically
                                    updated to the current date and time whenever the to-do is modified.
        category (ForeignKey): A foreign key linking the to-do to a Category object. If the associated category
                               is deleted, this field is set to null. This field is optional.
    """

    flat_share = ForeignKey("FlatShare", related_name="todos", on_delete=CASCADE)
    name = CharField(max_length=50)
    updateDate = DateTimeField(auto_now=True)
    category = ForeignKey("Category", on_delete=SET_NULL, null=True)
