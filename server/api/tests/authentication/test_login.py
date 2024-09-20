# api/tests/authentication/test_login.py

from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework_simplejwt.tokens import RefreshToken


class LoginTest(APITestCase):

    # Don't instantiate a new user for each test
    @classmethod
    def setUpTestData(cls):
        User = get_user_model()
        cls.email = 'testuser@test.com'
        cls.password = 'poisson44'
        cls.user = User.objects.create_user(
            username='testuser',
            email=cls.email,
            password=cls.password
        )
        cls.data = {
            'email': cls.email,
            'password': cls.password
        }
        cls.token_url = reverse('token_obtain_pair')
        cls.refresh_url = reverse('token_refresh')

    def setUp(self):
        self.client = APIClient()
        self.response = self.client.post(self.token_url, self.data, format='json')

    def test_success_obtain_jwt_response_status(self):
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)

    def test_success_obtain_jwt_response_body(self):
        self.assertIn('access', self.response.data)
        self.assertIn('refresh', self.response.data)

    def test_success_access_protected_view_with_jwt(self):
        # GIVEN
        access_token = self.response.data['access']
        user_id = self.user.id
        patch_url = reverse('user-detail', kwargs={'pk': user_id})

        # WHEN
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        protected_response = self.client.patch(patch_url, data={'username': 'modified'}, format='json')

        # THEN
        self.assertEqual(protected_response.status_code, status.HTTP_200_OK)
        self.assertEqual(protected_response.data['username'], 'modified')

    def test_failure_access_protected_view_with_invalid_jwt(self):
        # GIVEN
        invalid_token = 'InvalidToken123'
        user_id = self.user.id
        patch_url = reverse('user-detail', args=[user_id])

        # WHEN
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {invalid_token}')
        protected_response = self.client.patch(patch_url, {'username': 'modified'}, format='json')

        # THEN
        self.assertEqual(protected_response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', protected_response.data)
        self.assertEqual(protected_response.data['detail'], 'Given token not valid for any token type')

    def test_failure_access_protected_view_without_jwt(self):
        # GIVEN
        user_id = self.user.id
        patch_url = reverse('user-detail', args=[user_id])

        # WHEN
        # No Authorization header is set
        protected_response = self.client.patch(patch_url, {'username': 'modified'}, format='json')

        # THEN
        self.assertEqual(protected_response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', protected_response.data)
        self.assertEqual(protected_response.data['detail'], 'Authentication credentials were not provided.')

    def test_success_refresh_jwt_token(self):
        # GIVEN
        # Obtain initial JWT token
        refresh_token = self.response.data['refresh']

        # WHEN
        # Refresh the JWT token
        refresh_response = self.client.post(self.refresh_url, {'refresh': refresh_token}, format='json')

        # THEN
        self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)
        self.assertIn('access', refresh_response.data)

    def test_success_access_protected_view_with_refreshed_jwt(self):
        # GIVEN
        # Obtain initial JWT token
        response = self.client.post(self.token_url, {'email': self.email, 'password': self.password}, format='json')
        refresh_token = response.data['refresh']
        user_id = self.user.id
        patch_url = reverse('user-detail', args=[user_id])

        # WHEN
        # Refresh the JWT token
        refresh_response = self.client.post(self.refresh_url, {'refresh': refresh_token}, format='json')
        new_access_token = refresh_response.data['access']

        # THEN
        # Access a protected view with the refreshed JWT token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {new_access_token}')
        protected_response = self.client.patch(patch_url, {'username': 'modified'}, format='json')

        # ASSERT
        self.assertEqual(protected_response.status_code, status.HTTP_200_OK)
        self.assertEqual(protected_response.data['username'], 'modified')

    # def test_failure_access_protected_view_with_expired_jwt(self):
    #     # GIVEN
    #     # Create an expired JWT token
    #     refresh = RefreshToken.for_user(self.user)
    #     expired_token = refresh.access_token
    #
    #     refresh = RefreshToken.for_user(self.user)
    #     refresh.blacklist()
    #
    #     print(f"Token blacklisted: {refresh.is_blacklisted}")
    #
    #     user_id = self.user.id
    #     patch_url = reverse('user-detail', args=[user_id])
    #
    #     # WHEN
    #     # Try to access a protected view with the expired token
    #     self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {expired_token}')
    #     protected_response = self.client.get(patch_url, {'username': 'modified'}, format='json')
    #
    #     # THEN
    #     # Assert that the status code is 401 Unauthorized
    #     self.assertEqual(protected_response.status_code, status.HTTP_401_UNAUTHORIZED)
    #     self.assertIn('detail', protected_response.data)
    #     self.assertEqual(protected_response.data['detail'], 'Token is invalid or expired')
