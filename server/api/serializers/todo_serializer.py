# api/serializers/todo_serializer.py

from rest_framework.serializers import ModelSerializer

from api.models.todo_model import Todo

class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = (
            "flat_share",
            "name",
            "category"
        )
