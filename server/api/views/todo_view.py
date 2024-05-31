# api/views/todo_view.py

# Controller

from django.contrib.sessions.models import Session
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action

from api.models.todo_model import Todo
from api.serializers.todo_serializer import TodoSerializer


class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

    def create(self, request, **kwargs):
        """
        Create to-do list for a specific flat
        """
        serializer = TodoSerializer(data=request.data)
        if "sessionid" not in request.COOKIES:
            return Response({
                "error": "Missing session cookie"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            serializer.is_valid(raise_exception=True)
            session_id = request.COOKIES.get("sessionid")
            Session.objects.get(session_key=session_id)
            serializer.save()
            return Response({"todo": "created", "data": serializer.data}, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            return Response({"error": "validation error" + str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # detail=False => act on the collection / True=> on a specific instance
    @action(detail=False, methods=['GET'], url_path='(?P<flat_share_id>\d+)')
    def get_todos(self, request, flat_share_id=None):
        """
        Get all the to-do of a specific flat
        """
        if not flat_share_id:
            return Response({"error": "Missing flat share id"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            todos = Todo.objects.filter(flat_share__id=flat_share_id).values()
            return Response({"todos": todos}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """
        It is supposed to delete a to-do, but it's not working
        """
        print("au tout début")
        todo_id = self.kwargs['pk']  # Accède à l'ID de la tâche à partir de l'URL

        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
