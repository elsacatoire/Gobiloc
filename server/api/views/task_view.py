# api/views/task_view.py

# Controller

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action

from api.mixins.check_empty_patch_mixin import CheckEmptyPatchMixin
from api.models.task_model import Task
from api.serializers.task_serializer import TaskSerializer


class TaskViewSet(CheckEmptyPatchMixin, ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    # detail=False => act on the collection / True=> on a specific instance
    @action(detail=False, methods=['GET'], url_path='todo/(?P<todo_id>\d+)')
    def get_todos(self, request, todo_id=None): #à enlever si inutile
        """
        Get all the tasks of a specific to-do
        """
        if not todo_id:
            return Response({"error": "Missing todo id"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            tasks = Task.objects.filter(todo_id=todo_id).values()
            return Response({"tasks": tasks}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # partial_update = PATCH (?)

