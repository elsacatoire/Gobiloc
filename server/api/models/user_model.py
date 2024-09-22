# api/models/user_model.py

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(null=False)
    last_name = models.CharField(null=False)
    flat_share = models.ForeignKey("FlatShare", on_delete=models.SET_NULL, null=True)
    phone = models.CharField(max_length=20, null=True)
    date_updated = models.DateTimeField(auto_now=True)
    # password and username already exists in AbstractUser
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
