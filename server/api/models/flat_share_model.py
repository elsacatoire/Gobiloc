# api/models/flat_share_model.py

from django.db.models import CharField, Model


class FlatShare(Model):
    name = CharField(max_length=50)
    description = CharField(max_length=255, null=True)
