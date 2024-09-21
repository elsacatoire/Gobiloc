# api/serializers/task_serializer.py

# DTO
from rest_framework.serializers import ModelSerializer
from api.models.task_model import Task


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "todo", "content", "done"]
