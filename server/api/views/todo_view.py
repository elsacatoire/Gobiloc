# api/views/todo_view.py

# Controller

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

from api.models import FlatShare
from api.models.todo_model import Todo
from api.serializers.todo_serializer import TodoSerializer


class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

    # detail=False => act on the collection / True=> on a specific instance
    @action(detail=False, methods=['GET'], url_path='flat/(?P<flat_share_id>\d+)')
    def get_todos(self, request, flat_share_id=None):
        """
        Get all the to-do of a specific flat
        """
        if not flat_share_id:
            return Response({"error": "Missing flat share id"}, status=status.HTTP_400_BAD_REQUEST)

        # Use get_object_or_404 to check if the flat exists
        get_object_or_404(FlatShare, pk=flat_share_id)

        # If flat_share is found, proceed to get todos
        todos = Todo.objects.filter(flat_share__id=flat_share_id).order_by("-updateDate")
        return Response({"todos": todos.values()}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['GET'], url_path='tasks')
    def get_todo_with_tasks(self, request, pk=None):
        """
        Get a single to-do with all its tasks
        """
        todo = get_object_or_404(Todo, pk=pk)
        serializer = TodoSerializer(todo)
        return Response(serializer.data, status=status.HTTP_200_OK)
