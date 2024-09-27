# api/views/flat_share_view.py
# Controller

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.models import User
from api.models.flat_share_model import FlatShare
from api.serializers.flat_serializer import FlatSerializer
from api.serializers.user_serializer import UserSerializer


class FlatShareViewSet(ModelViewSet):
    serializer_class = FlatSerializer
    queryset = FlatShare.objects.all()

    @action(detail=True, methods=["GET"], url_path="users")
    def get_flat_users(self, request, pk=None):
        users = User.objects.filter(flat_share=pk)
        if users.exists():
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)
        else:
            return Response({"message": "No users found for this flat."}, status=404)
