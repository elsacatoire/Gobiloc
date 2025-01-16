from django.test import TestCase
from django.contrib.auth import get_user_model
from api.models import Invitation, FlatShare
import uuid


class InvitationModelTest(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@test.com",
            password="testpassword"
        )
        self.flat = FlatShare.objects.create(name="Test Flat")

    def test_invitation_creation(self):
        """Test la création d'une Invitation avec des champs valides."""
        invitation = Invitation.objects.create(
            invited_by=self.user,
            flat_share=self.flat,
            code=str(uuid.uuid4())[:20]  # un code simulé
        )
        self.assertIsNotNone(invitation.id)
        self.assertEqual(invitation.invited_by, self.user)
        self.assertEqual(invitation.flat_share, self.flat)
        self.assertTrue(len(invitation.code) <= 20)

    def test_code_uniqueness(self):
        """Vérifie qu'un code dupliqué lève une erreur d'intégrité."""
        code = "UNIQUE_CODE_123"
        Invitation.objects.create(
            invited_by=self.user,
            flat_share=self.flat,
            code=code
        )
        with self.assertRaises(Exception):  # Could be IntegrityError
            Invitation.objects.create(
                invited_by=self.user,
                flat_share=self.flat,
                code=code
            )

    def test_invitation_string_representation(self):
        """Vérifie le __str__ du modèle Invitation."""
        invitation = Invitation.objects.create(
            invited_by=self.user,
            flat_share=self.flat,
            code="TEST_CODE"
        )
        self.assertEqual(str(invitation), "TEST_CODE")
