# api/models/user_model.py

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Represents a user entity that extends the default Django AbstractUser model,
    with additional fields for email, flat share association, and contact information.

    Attributes:
        email (EmailField): The user's email address, which must be unique and is used as the username field.
        first_name (CharField): The user's first name. This field is required and cannot be null.
        last_name (CharField): The user's last name. This field is required and cannot be null.
        flat_share (ForeignKey): A foreign key linking the user to a FlatShare object. If the associated
                                 flat share is deleted, this field is set to null. This field is optional.
        phone (CharField): The user's phone number, with a maximum length of 20 characters. This field is optional.
        date_updated (DateTimeField): The date and time when the user was last updated. This field is automatically
                                      set to the current date and time whenever the user is modified.
        USERNAME_FIELD (str): Specifies the field used as the unique identifier for the user. Set to "email".
        REQUIRED_FIELDS (list): A list of fields that are required when creating a user.
                                In this case, only "username" is required apart from the email.
    """

    email = models.EmailField(unique=True)
    first_name = models.CharField(null=False)
    last_name = models.CharField(null=False)
    flat_share = models.ForeignKey(
        "FlatShare",
        related_name="users",
        on_delete=models.SET_NULL,
        null=True
    )
    phone = models.CharField(max_length=20, null=True)
    date_updated = models.DateTimeField(auto_now=True)
    # password and username already exists in AbstractUser
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
