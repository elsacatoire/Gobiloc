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

    def create(self, request, **kwargs):
        """
        Create a flat
        """
        serializer = FlatSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"flat": "created", "data": serializer.data}, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            return Response({"error": "validation error" + str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # detail=False => act on the collection / True=> on a specific instance
    @action(detail=True, methods=['GET'], url_path='(?P<flat_share_id>\d+)')
    def get_todos(self, request, flat_share_id=None):
        """
        Get a specific flat
        """
        if not flat_share_id:
            return Response({"error": "Missing flat id"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            flat = FlatShare.objects.filter(todo_id=flat_share_id).values()
            return Response({"flat": flat}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
