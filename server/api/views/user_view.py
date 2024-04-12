# api/views/user_view.py
from django.core.validators import validate_email
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError as DRFValidationError
from django.core.exceptions import ValidationError as DjangoValidationError, ValidationError
from django.contrib.auth import authenticate, login

from api.serializers.user_serializer import UserSerializer


class UserViewSet(ModelViewSet):

    serializer_class = UserSerializer

    def create(self, request, **kwargs):
        serializer = UserSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'user': serializer.data}, status=status.HTTP_201_CREATED)

        except DRFValidationError as e:
            not_unique_username = "username" in e.get_codes() and e.get_codes()["username"] == ["unique"]
            not_unique_email = "email" in e.get_codes() and e.get_codes()["email"] == ["unique"]
            if not_unique_username or not_unique_email:
                return Response(e.detail, status=status.HTTP_409_CONFLICT)

            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

        except DjangoValidationError as e:
            return Response({'password': e.messages}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Missing Credentials'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_email(email)
        except ValidationError as e:
            return Response({'error': e.messages[0]}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email=email, password=password)
        if user is None:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)
        request.session['email'] = email

        stay_connected = request.data.get('stay_connected')
        if stay_connected:
            request.session.set_expiry(60*60*24*90)

        return Response({'status': 'Login Success'}, status=status.HTTP_200_OK)
