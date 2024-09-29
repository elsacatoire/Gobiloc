# api/models/budget_model.py
from django.db import models
from django.db.models import CASCADE, ForeignKey

from api.models import FlatShare


class Budget(models.Model):
    name = models.CharField(max_length=100)
    flat_share = ForeignKey(FlatShare, on_delete=CASCADE)
