# api/serializers/flat_share_serializer.py

# DTO

from rest_framework.serializers import ModelSerializer

from api.models.flat_share_model import FlatShare


class FlatSerializer(ModelSerializer):
    class Meta:
        model = FlatShare
        fields = ["name", "description"]
