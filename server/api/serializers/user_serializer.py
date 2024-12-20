# api/serializers/user_serializer.py

from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework.serializers import ModelSerializer

from api.models.user_model import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password", "date_joined", "flat_share_id")
        extra_kwargs = {
            "password": {"write_only": True},
            "date_joined": {"read_only": True},
            "flat_share_id": {"read_only": True},
        }

    def create(self, validated_data):
        """
        Stronger criteria for password validation
        """
        validated_data["email"] = validated_data["email"].lower()
        # Set register time and updatetime (?)
        user = User(**validated_data)
        try:
            validate_password(validated_data["password"], user=user)

        except exceptions.ValidationError as e:
            raise exceptions.ValidationError({"password": e.messages})

        user.set_password(validated_data["password"])
        user.save()
        return user


class BasicUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]