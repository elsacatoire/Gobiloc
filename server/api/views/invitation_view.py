# api/views/invitation_views.py

import hashlib
import uuid
from datetime import datetime, timedelta
from django.utils import timezone
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import GenericViewSet

from api.models.invitation_model import Invitation
from api.serializers.invitation_serializer import InvitationSerializer


class CreateInvitationViewSet(GenericViewSet, CreateModelMixin):
    serializer_class = InvitationSerializer

    def create(self, request, *args, **kwargs):
        user = request.user
        flat_share = user.flat_share
        if not flat_share:
            return Response({"error": "User does not have a flat share"}, status=status.HTTP_403_FORBIDDEN)

        invitation = Invitation(
            invited_by=user,
            flat_share=flat_share,
            created_at=datetime.now(),
        )
        invitation.code = self.generate_code(flat_share.id, invitation.created_at)
        invitation.save()

        return Response(InvitationSerializer(invitation).data, status=status.HTTP_201_CREATED)

    @staticmethod
    def generate_code(flat_id: int, created_at: datetime) -> str:
        base_string = str(flat_id) + str(created_at)
        hashed_base = hashlib.md5(base_string.encode('utf-8')).hexdigest()
        random_suffix = str(uuid.uuid4())[:6]
        combined = hashed_base[:14] + random_suffix

        return combined


class AcceptInvitationViewSet(GenericViewSet, CreateModelMixin):

    def create(self, request, *args, **kwargs):
        user = request.user
        if user.flat_share:
            return Response({"error": "User is already in a flat share"}, status=status.HTTP_400_BAD_REQUEST)

        invitation_code = request.data.get('invitation_code')

        try:
            invitation = Invitation.objects.get(code=invitation_code)
        except Invitation.DoesNotExist:
            return Response({"error": "Invalid invitation code"}, status=status.HTTP_400_BAD_REQUEST)

        if not invitation or invitation.created_at <= timezone.now() - timedelta(days=7):
            return Response({"error": "Invitation expired"}, status=status.HTTP_400_BAD_REQUEST)

        user.flat_share = invitation.flat_share
        user.save()

        return Response({"message": "Invitation accepted"}, status=status.HTTP_200_OK)
