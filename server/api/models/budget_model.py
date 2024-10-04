# api/models/budget_model.py

from django.db.models import CASCADE, ForeignKey, Model, CharField
from api.models import FlatShare


class Budget(Model):
    name = CharField(max_length=100)
    flat_share = ForeignKey(FlatShare, on_delete=CASCADE)

    def __str__(self):
        return self.name
