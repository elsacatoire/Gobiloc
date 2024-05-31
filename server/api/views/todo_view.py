# api/views/todo_view.py

# Controller

from django.contrib.sessions.models import Session
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action

from api.models.todo_model import Todo
from api.models.user_model import User
from api.serializers.todo_serializer import TodoSerializer


class TodoViewSet(ModelViewSet):

    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

    def create(self, request, **kwargs):

        serializer = TodoSerializer(data=request.data)
        if "sessionid" not in request.COOKIES:
            return Response({
                "error": "Missing session cookie"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            serializer.is_valid(raise_exception=True)
            session_id = request.COOKIES.get("sessionid")
            Session.objects.get(session_key = session_id)
            serializer.save()
            return Response({"todo" : "created"}, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            return Response({"error": "validation error"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['GET'])
    def get_todos(self, request):
        if "flat_share_id" not in request.data:
            return Response({"error": "Missing flat share id"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            flat_share_id = request.data["flat_share_id"]
            todos = Todo.objects.filter(flat_share__id = flat_share_id).values()
            return Response({"todos" : todos}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        todo_id = self.kwargs['pk']  # Accède à l'ID de la tâche à partir de l'URL

        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
