# api/models/todo_model.py

from django.db.models import (
    Model,
    ForeignKey,
    CASCADE,
    CharField,
    DateTimeField,
    SET_NULL,
)


class Todo(Model):
    # With cascade if flat_share is deleted,
    # the associate to-do is also deleted
    # by default it is null = False
    flat_share = ForeignKey("FlatShare", on_delete=CASCADE)
    name = CharField(max_length=50)
    updateDate = DateTimeField(auto_now=True)
    category = ForeignKey("Category", on_delete=SET_NULL, null=True)
