import json

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from api.models import FlatShare, Todo, User


class TestTodoViewSet(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.flat_share = FlatShare.objects.create(name="Test FlatShare")

        cls.user = User.objects.get_or_create(
            username="testuser", email="testuser@test.com", password="testpassword"
        )[0]

        cls.user.flat_share = cls.flat_share
        cls.user.save()

        refresh = RefreshToken.for_user(cls.user)
        cls.token = str(refresh.access_token)

    def setUp(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_get_todos_success(self):
        # Given
        todo1 = Todo.objects.create(flat_share=self.flat_share, name="Test Todo 1")
        url = reverse("flat-todo-list", kwargs={"flat_pk": self.flat_share.id})

        # When
        response = self.client.get(url)

        # Then
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["name"], todo1.name)

    def test_get_todos_flat_has_no_todo(self):
        # Given
        url_empty = reverse("flat-todo-list", kwargs={"flat_pk": self.flat_share.id})

        # When
        response = self.client.get(url_empty)

        # Then
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_todos_of_a_non_existing_flat(self):
        # Given
        url_not_existing_id_flat = reverse("flat-todo-list", kwargs={"flat_pk": 999})

        # When
        response = self.client.get(url_not_existing_id_flat)

        # Then
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["detail"], "Not found.")

    # Test a singular To-do
    def test_create_todo_success(self):
        # Given
        data = {"name": "New Todo"}
        pre_existing_todos_nb = Todo.objects.count()

        # When
        url = reverse("flat-todo-list", kwargs={"flat_pk": self.flat_share.id})
        response = self.client.post(url, data, format="json")
        todo = Todo.objects.get(id=response.data["id"])

        # Then
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.count(), pre_existing_todos_nb + 1)
        self.assertEqual(todo.name, "New Todo")

    def test_update_todo_success(self):
        # Given
        todo = Todo.objects.create(flat_share=self.flat_share, name="Old Name")
        data = {"name": "Updated Name"}
        url = reverse(
            "flat-todo-detail", kwargs={"flat_pk": self.flat_share.id, "pk": todo.id}
        )

        # When
        response = self.client.patch(
            url, data=json.dumps(data), content_type="application/json"
        )

        # Then
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Todo.objects.get(id=todo.id).name, "Updated Name")

    def test_delete_todo_success(self):
        # Given
        todo = Todo.objects.create(
            flat_share=self.flat_share, name="Test Todo to delete"
        )
        url = reverse(
            "flat-todo-detail", kwargs={"flat_pk": self.flat_share.id, "pk": todo.id}
        )
        todos_nb_before_delete = Todo.objects.count()

        # When
        response = self.client.delete(url)

        # Then
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), todos_nb_before_delete - 1)
