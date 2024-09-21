# api/views/flat_share_view.py
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.models.flat_share_model import FlatShare
from api.serializers.flat_serializer import FlatSerializer

# Controller


class FlatShareViewSet(ModelViewSet):
    serializer_class = FlatSerializer
    queryset = FlatShare.objects.all()
