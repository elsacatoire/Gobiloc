# api/serializers/flat_share_serializer.py

# DTO

from rest_framework.serializers import ModelSerializer

from api.models.flat_share_model import FlatShare
from api.serializers.user_serializer import BasicUserSerializer


class FlatSerializer(ModelSerializer):
    users = BasicUserSerializer(many=True, read_only=True)

    class Meta:
        model = FlatShare
        fields = ["id", "name", "description", "users"]
