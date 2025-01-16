from django.test import TestCase
from django.contrib.auth import get_user_model
from api.models import Invitation, FlatShare
from api.serializers.invitation_serializer import InvitationSerializer


class InvitationSerializerTest(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@test.com",
            password="testpassword"
        )
        self.flat = FlatShare.objects.create(name="Test Flat")

    def test_serializer_fields(self):
        """Vérifie que le serializer retourne les champs attendus."""
        invitation = Invitation.objects.create(
            invited_by=self.user,
            flat_share=self.flat,
            code="01234567890123456789"
        )
        serializer = InvitationSerializer(invitation)
        data = serializer.data

        self.assertEqual(data["invited_by"], self.user.email)  # StringRelatedField
        self.assertEqual(data["flat_share"], self.flat.id)  # PrimaryKeyField par défaut
        self.assertEqual(data["code"], "01234567890123456789")
        self.assertIn("created_at", data)
