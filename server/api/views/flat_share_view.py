# api/views/flat_share_view.py
# Controller
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import status

from api.models.flat_share_model import FlatShare
from api.serializers.flat_share_serializer import FlatSerializer


class FlatShareViewSet(
    GenericViewSet,
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin
):
    serializer_class = FlatSerializer

    def create(self, request, *args, **kwargs):
        has_already_a_flat = FlatShare.objects.filter(users=self.request.user).exists()

        if has_already_a_flat:
            return Response(
                {"error": "User is already in a flat."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        flat_share = serializer.save()
        self.request.user.flat_share = flat_share
        self.request.user.save()
        headers = self.get_success_headers(serializer.data)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    def get_queryset(self):
        return FlatShare.objects.filter(users=self.request.user)

    def perform_update(self, serializer):
        if self.request.user not in self.get_object().users.all():
            return Response(
                {"error": "Only users in the flat can update it."},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().perform_update(serializer)
