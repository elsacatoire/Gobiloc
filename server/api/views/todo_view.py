# api/views/todo_view.py

from django.contrib.sessions.models import Session
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError

from api.models.todo_model import Todo
from api.models.user_model import User
from api.serializers.todo_serializer import TodoSerializer


class TodoViewSet(ModelViewSet):

    serializer_class = TodoSerializer

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
