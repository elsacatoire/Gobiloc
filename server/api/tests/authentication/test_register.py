# api/tests/authentication/test_login.py

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient


class RegisterTest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.url = reverse("user-list")
        cls.email = "testuser@test.com"
        cls.username = "Floof"
        cls.password = "poisson44"
        cls.data = {
            "email": cls.email,
            "username": cls.username,
            "password": cls.password,
        }
        cls.data_caps_email = {
            "email": "Testuser2@test.com",
            "username": "Pat",
            "password": cls.password,
        }
        cls.data_space_email = {
            "email": " testuser3@test.com ",
            "username": "Hellsax",
            "password": cls.password,
        }
        cls.email_failure = "johndoe@test.com"
        cls.username_failure = "Pierre"

    def setUp(self):
        self.client = APIClient()
        self.response = self.client.post(self.url, data=self.data, format="json")

    def test_success_response_status_code(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_success_response_body(self):
        expected_body = {
            "user": {
                "username": "Floof",
                "email": "testuser@test.com",
                "date_joined": self.response.json()["user"]["date_joined"],
                "flat_share_id": None,
            }
        }
        self.assertEqual(self.response.json(), expected_body)

    def test_success_caps_email(self):
        response = self.client.post(self.url, data=self.data_caps_email, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        expected_body = {
            "user": {
                "username": "Pat",
                "email": "testuser2@test.com",
                "date_joined": response.json()["user"]["date_joined"],
                "flat_share_id": None,
            }
        }
        self.assertEqual(response.json(), expected_body)

    def test_success_space_in_email(self):
        response = self.client.post(self.url, data=self.data_space_email, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        expected_body = {
            "user": {
                "username": "Hellsax",
                "email": "testuser3@test.com",
                "date_joined": response.json()["user"]["date_joined"],
                "flat_share_id": None,
            }
        }
        self.assertEqual(response.json(), expected_body)

    def test_failure_blank_username(self):
        data = {"username": "", "email": self.email_failure, "password": self.password}
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = response.json()
        self.assertIn("username", response_data)
        self.assertIn("This field may not be blank.", response_data["username"])

    def test_failure_no_username(self):
        data = {"email": self.email_failure, "password": self.password}
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = response.json()
        self.assertIn("username", response_data)
        self.assertIn("This field is required.", response_data["username"])

    def test_failure_blank_email(self):
        data = {
            "username": self.username_failure,
            "email": "",
            "password": self.password,
        }
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = response.json()
        self.assertIn("email", response_data)
        self.assertIn("This field may not be blank.", response_data["email"])

    def test_failure_no_email(self):
        data = {"username": self.username_failure, "password": self.password}
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = response.json()
        self.assertIn("email", response_data)
        self.assertIn("This field is required.", response_data["email"])

    def test_failure_blank_password(self):
        data = {
            "username": self.username_failure,
            "email": self.email_failure,
            "password": "",
        }
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = response.json()
        self.assertIn("password", response_data)
        self.assertIn("This field may not be blank.", response_data["password"])

    def test_failure_no_password(self):
        data = {
            "username": self.username_failure,
            "email": self.email_failure,
        }
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = response.json()
        self.assertIn("password", response_data)
        self.assertIn("This field is required.", response_data["password"])

    def test_failure_username_already_taken(self):
        data = {
            "username": self.username,
            "email": self.email_failure,
            "password": self.password,
        }
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

        response_data = response.json()
        self.assertIn("username", response_data)
        self.assertIn(
            "A user with that username already exists.", response_data["username"]
        )

    def test_failure_email_already_taken(self):
        data = {
            "username": self.username_failure,
            "email": self.email,
            "password": self.password,
        }
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

        response_data = response.json()
        self.assertIn("email", response_data)
        self.assertIn("user with this email already exists.", response_data["email"])

    def test_failure_username_in_password(self):
        data = {
            "username": self.username_failure,
            "email": self.email_failure,
            "password": self.username_failure + "2445",
        }
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = response.json()
        self.assertIn("password", response_data)
        self.assertIn(
            "The password is too similar to the username.", response_data["password"]
        )

    def test_failure_email_in_password(self):
        data = {
            "username": self.username_failure,
            "email": self.email_failure,
            "password": "johndoe4564",
        }
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = response.json()
        self.assertIn("password", response_data)
        self.assertIn(
            "The password is too similar to the email.", response_data["password"]
        )

    def test_failure_password_too_short(self):
        data = {
            "username": self.username_failure,
            "email": self.email_failure,
            "password": "xfzufe",
        }
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = response.json()
        self.assertIn("password", response_data)
        too_short = "This password is too short. It must contain at least 8 characters."
        self.assertIn(too_short, response_data["password"])

    def test_failure_password_too_common(self):
        data = {
            "username": self.username_failure,
            "email": self.email_failure,
            "password": "password123",
        }
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = response.json()
        self.assertIn("password", response_data)
        self.assertIn("This password is too common.", response_data["password"])

    def test_failure_password_entirely_numeric(self):
        data = {
            "username": self.username_failure,
            "email": self.email_failure,
            "password": "21344273658",
        }
        response = self.client.post(self.url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = response.json()
        self.assertIn("password", response_data)
        self.assertIn("This password is entirely numeric.", response_data["password"])
