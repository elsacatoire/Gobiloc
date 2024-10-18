# api/views/invitation_views.py

import hashlib
import uuid
from datetime import datetime, timedelta
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import CreateAPIView

from api.models.invitation_model import Invitation
from api.serializers.invitation_serializer import InvitationSerializer

class CreateInvitationView(CreateAPIView):
    serializer_class = InvitationSerializer

    def post(self, request, *args, **kwargs):
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
        random_suffix = str(uuid.uuid4())[:8]
        combined = hashed_base[:16] + random_suffix

        return combined


class AcceptInvitationView(CreateAPIView):
    serializer_class = InvitationSerializer

    def post(self, request, *args, **kwargs):
        invitation_code = request.data.get('invitation_code')
        invitation = Invitation.objects.get(code=invitation_code)

        if invitation and invitation.created_at > datetime.now() - timedelta(days=7):
            user = request.user
            user.flat_share = invitation.flat_share
            user.save()

            return Response({"message": "Invitation accepted"}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid code or expired"}, status=status.HTTP_400_BAD_REQUEST)
