# api/models/invitation_model.py

from django.db import models
from api.models.user_model import User


class Invitation(models.Model):
    invited_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_invitations')
    flat_share = models.ForeignKey('FlatShare', on_delete=models.CASCADE, related_name='invitations')
    code = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.code}"
