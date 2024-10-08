# api/views/flat_share_view.py
# Controller
from rest_framework.viewsets import ModelViewSet

from api.models.flat_share_model import FlatShare
from api.serializers.flat_serializer import FlatSerializer


class FlatShareViewSet(ModelViewSet):
    serializer_class = FlatSerializer
    queryset = FlatShare.objects.all()
