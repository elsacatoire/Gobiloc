from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from api.models import Invitation, FlatShare
from datetime import timedelta


class AcceptInvitationIntegrationTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        User = get_user_model()
        cls.owner = User.objects.create_user(
            username="owner",
            email="owner@test.com",
            password="password"
        )
        cls.flat = FlatShare.objects.create(name="Owner Flat")
        cls.owner.flat_share = cls.flat
        cls.owner.save()

        # Création d'une invitation
        cls.invitation = Invitation.objects.create(
            invited_by=cls.owner,
            flat_share=cls.flat,
            code="INVITE_123",
            created_at=timezone.now()
        )
        # Endpoint accept-invite
        cls.accept_invite_url = reverse("accept-invite-list")

    def setUp(self):
        self.client = APIClient()

    def test_accept_invitation_success(self):
        """Vérifie qu'un user sans flat_share peut rejoindre avec un code valide."""
        user_no_flat = get_user_model().objects.create_user(
            username="guest",
            email="guest@test.com",
            password="password"
        )
        self.client.force_authenticate(user=user_no_flat)
        data = {"invitation_code": "INVITE_123"}
        response = self.client.post(self.accept_invite_url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Invitation accepted")
        user_no_flat.refresh_from_db()
        self.assertEqual(user_no_flat.flat_share, self.flat)

    def test_accept_invitation_already_in_flat(self):
        """Vérifie qu'un user déjà membre d'une flat ne peut pas accepter une invitation."""
        self.client.force_authenticate(user=self.owner)  # user déjà dans un flat
        data = {"invitation_code": "INVITE_123"}
        response = self.client.post(self.accept_invite_url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "User is already in a flat share")

    def test_invalid_invitation_code(self):
        """Vérifie qu'un code invalide retourne une erreur 400."""
        user_no_flat = get_user_model().objects.create_user(
            username="anotherUser",
            email="another@test.com",
            password="password"
        )
        self.client.force_authenticate(user=user_no_flat)
        data = {"invitation_code": "WRONG_CODE"}
        response = self.client.post(self.accept_invite_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Invalid invitation code")

    def test_expired_invitation(self):
        """Vérifie qu'une invitation plus vieille que 7 jours est considérée comme expirée."""
        self.invitation.created_at = timezone.now() - timedelta(days=8)
        self.invitation.save()

        user_no_flat = get_user_model().objects.create_user(
            username="anotherUser2",
            email="another2@test.com",
            password="password2"
        )
        self.client.force_authenticate(user=user_no_flat)
        data = {"invitation_code": "INVITE_123"}
        response = self.client.post(self.accept_invite_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Invitation expired")
