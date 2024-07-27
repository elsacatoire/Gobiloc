# api/serializers/todo_serializer.py

# DTO

from rest_framework.serializers import ModelSerializer
from api.models import Todo
from api.serializers.task_serializer import TaskSerializer


class TodoSerializer(ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Todo
        fields = ['flat_share', 'name', 'category', 'tasks']
