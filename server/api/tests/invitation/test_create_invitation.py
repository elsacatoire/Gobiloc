from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from api.models import Invitation, FlatShare


class CreateInvitationIntegrationTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        User = get_user_model()
        cls.user = User.objects.create_user(
            username="testuser",
            email="testuser@test.com",
            password="testpassword"
        )
        cls.flat = FlatShare.objects.create(name="Test Flat")
        cls.user.flat_share = cls.flat
        cls.user.save()

        cls.create_invite_url = reverse("create-invite-list", kwargs={"flat_pk": cls.flat.pk})

    def setUp(self):
        self.client = APIClient()
        # Simule l'authentification de l'utilisateur
        self.client.force_authenticate(user=self.user)

    def test_success_create_invitation(self):
        response = self.client.post(self.create_invite_url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("code", response.data)
        self.assertIn("invited_by", response.data)
        self.assertIn("flat_share", response.data)
        self.assertIn("created_at", response.data)
        self.assertEqual(response.data["invited_by"], self.user.email)
        self.assertEqual(response.data["flat_share"], self.flat.pk)
        self.assertTrue(Invitation.objects.filter(code=response.data["code"]).exists())

    def test_error_no_flat_share(self):
        user2 = get_user_model().objects.create_user(
            username="userNoFlat",
            email="userNoFlat@test.com",
            password="password"
        )
        self.client.force_authenticate(user=user2)
        response = self.client.post(self.create_invite_url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn("error", response.data)
