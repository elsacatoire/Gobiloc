from django.contrib.sessions.backends.db import SessionStore
from django.contrib.sessions.models import Session
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from unittest.mock import patch
from django.contrib.auth import get_user_model
from rest_framework import status

User = get_user_model()


class LogoutTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.logout_url = reverse('user-logout')
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)

    @patch('django.contrib.auth.logout')
    def test_successful_logout(self, mock_logout):
        """Test successful logout."""
        response = self.client.delete(self.logout_url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertNotIn('sessionid', self.client.cookies.keys())

    @patch('django.contrib.auth.logout')
    def test_logout_without_authentication(self, mock_logout):
        """Test logout attempt without authentication."""
        self.client.logout()  # Ensure client starts unauthenticated
        response = self.client.delete(self.logout_url)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'No user is currently logged in.')

    @patch('django.contrib.auth.logout')
    def test_session_data_after_logout(self, mock_logout):
        """Test session data after successful logout."""
        # Create a new session
        session = SessionStore()
        session['test_key'] = 'test_value'
        session.save()

        # Ensure the session ID is set in the client cookies
        self.client.cookies['sessionid'] = session.session_key

        # Verify session data is set
        self.assertEqual(self.client.session.get('test_key'), 'test_value')

        # Perform logout
        self.client.delete(self.logout_url)

        # Verify session data is cleared by checking session ID
        # The session should be invalidated and cleared
        self.assertIsNone(Session.objects.filter(pk=session.session_key).first())

        # Alternatively, check if the session data is cleared from the client session
        self.assertIsNone(self.client.session.get('test_key'))

    def tearDown(self):
        self.client.logout()