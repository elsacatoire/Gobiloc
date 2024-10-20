# api/serializers/invitation_serializer.py

from rest_framework import serializers
from api.models.invitation_model import Invitation


class InvitationSerializer(serializers.ModelSerializer):
    invited_by = serializers.StringRelatedField()

    class Meta:
        model = Invitation
        fields = ["invited_by", "flat_share", "code", "created_at"]