# api/views/flat_share_view.py

# Controller

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action

from api.models.flat_share_model import FlatShare
from api.serializers.flat_serializer import FlatSerializer


class FlatShareViewSet(ModelViewSet):
    serializer_class = FlatSerializer
    queryset = FlatShare.objects.all()
