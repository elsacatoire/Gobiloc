# api/views/user_view.py

from django.core.validators import validate_email
from rest_framework.decorators import action
from rest_framework import status, permissions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import (
    ValidationError as DRFValidationError,
    NotAuthenticated,
    PermissionDenied,
)
from django.core.exceptions import (
    ValidationError as DjangoValidationError,
    ValidationError,
)
from django.contrib.auth import authenticate, login, logout

from api.models import User
from api.serializers.user_serializer import UserSerializer


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return User.objects.filter(id=user.id)
        else:
            raise PermissionDenied("User not authenticated.")

    def get_permissions(self):
        """
        Custom permissions for different actions.
        """
        if self.action == "create":
            # Allow anyone to register (no authentication required)
            return [AllowAny()]
        # For all other actions, apply default permissions (IsAuthenticated)
        return super().get_permissions()

    def create(self, request, **kwargs):
        """
        Register a user into the app
        """
        serializer = UserSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)

        except DRFValidationError as e:
            not_unique_username = "username" in e.get_codes() and e.get_codes()[
                "username"
            ] == ["unique"]
            not_unique_email = "email" in e.get_codes() and e.get_codes()["email"] == [
                "unique"
            ]
            if not_unique_username or not_unique_email:
                return Response(e.detail, status=status.HTTP_409_CONFLICT)

            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

        except DjangoValidationError as e:
            return Response(
                {"password": e.messages}, status=status.HTTP_400_BAD_REQUEST
            )
