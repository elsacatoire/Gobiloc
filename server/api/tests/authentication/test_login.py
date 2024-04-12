from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient


class LoginTest(APITestCase):

    # Don't instantiate a new user for each test
    @classmethod
    def setUpTestData(cls):
        User = get_user_model()
        cls.url = reverse('user-login')
        cls.email = 'testuser@test.com'
        cls.password = 'poisson44'
        cls.data = {
            'email': cls.email,
            'password': cls.password
        }
        cls.data_stay_connected = {
            'email': cls.email,
            'password': cls.password,
            'stay_connected': True
        }
        cls.user = User.objects.create_user(
            username='testuser',
            email=cls.email,
            password=cls.password
        )

    def setUp(self):
        self.client = APIClient()
        self.response = self.client.post(self.url, self.data, format='json')
        self.client_stay_connected = APIClient()
        self.response_stay_connected = self.client_stay_connected.post(
            self.url,
            self.data_stay_connected,
            format='json'
        )

    def test_success_response_status(self):
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)

    def test_success_response_body(self):
        self.assertEqual(self.response.data['status'], 'Login Success')

    def test_success_session_created(self):
        self.assertEqual(self.client.session['email'], 'testuser@test.com')

    def test_success_session_cookie(self):
        self.assertIn('sessionid', self.response.cookies)

    def test_success_csrf_token_cookie(self):
        self.assertIn('csrftoken', self.response.cookies)

    def test_success_session_expires_when_browser_is_closed(self):
        self.assertEqual(self.response.cookies['sessionid']['expires'], '')

    def test_success_session_expiry_age_is_2_hours(self):
        self.assertEqual(self.client.session.get_expiry_age(), 7200)

    #
    #
    # If stay_connected is true :
    def test_success_stay_connected_response_status(self):
        self.assertEqual(self.response_stay_connected.status_code, status.HTTP_200_OK)

    def test_success_stay_connected_response_body(self):
        self.assertEqual(self.response_stay_connected.data['status'], 'Login Success')

    def test_success_stay_connected_session_created(self):
        self.assertEqual(self.client_stay_connected.session['email'], 'testuser@test.com')

    def test_success_stay_connected_session_cookie(self):
        self.assertIn('sessionid', self.response_stay_connected.cookies)

    def test_success_stay_connected_csrf_token_cookie(self):
        self.assertIn('csrftoken', self.response_stay_connected.cookies)

    def test_success_stay_connected_session_expiry_age_is_90_days(self):
        self.assertEqual(self.client_stay_connected.session.get_expiry_age(), 7776000)

    #
    #
    # Now we test the failures :
    def test_wrong_email_response_status(self):
        data = {
            'email': 'testwrongemail@test.com',
            'password': self.password
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_wrong_email_response_body(self):
        data = {
            'email': 'testwrongemail@test.com',
            'password': self.password
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.data['error'], 'Invalid Credentials')

    def test_wrong_password_response_status(self):
        data = {
            'email': self.email,
            'password': 'awrongpassword'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_wrong_password_response_body(self):
        data = {
            'email': self.email,
            'password': 'awrongpassword'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.data['error'], 'Invalid Credentials')

    def test_missing_email_response_status(self):
        data = {
            'password': self.password
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_missing_email_response_body(self):
        data = {
            'password': self.password
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.data['error'], 'Missing Credentials')

    def test_missing_password_response_status(self):
        data = {
            'email': self.email
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_missing_password_response_body(self):
        data = {
            'email': self.email
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.data['error'], 'Missing Credentials')

    def test_failure_case_sensitive_email_status_code(self):
        data = {
            'email': 'Testuser@test.com',
            'password': self.password
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_failure_case_sensitive_email_status_body(self):
        data = {
            'email': 'Testuser@test.com',
            'password': self.password
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.data['error'], 'Invalid Credentials')
