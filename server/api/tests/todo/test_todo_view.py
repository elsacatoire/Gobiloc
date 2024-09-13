from unittest import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from api.models import FlatShare, Todo


class TestTodoViewSet(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.user = User.objects.create_user(username='testuser', email='testuser@test.com', password='testpassword')
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)

    def test_get_todos_success(self):
        # Given
        flat_share = FlatShare.objects.create(name="Test FlatShare")
        todo1 = Todo.objects.create(flat_share=flat_share, name="Test Todo 1")
        todo2 = Todo.objects.create(flat_share=flat_share, name="Test Todo 2")
        url = reverse('flat-todo-list', kwargs={'flat_pk': flat_share.id})

        # When
        response = self.client.get(url)

        # Then
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['todos']), 2)
        self.assertEqual(response.data['todos'][0]['name'], todo1.name)

    def test_get_todos_flat_has_no_todo(self):
        # Given
        flat_share_empty = FlatShare.objects.create(name="Test FlatShare")
        url_empty = reverse('flat-todo-list', kwargs={'flat_pk': flat_share_empty.id})

        # When
        response = self.client.get(url_empty)

        # Then
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['todos']), 0)

    def test_get_todos_of_a_non_existing_flat(self):
        # Given
        url_not_existing_id_flat = reverse('flat-todo-list', kwargs={'flat_pk': 999})

        # When
        response = self.client.get(url_not_existing_id_flat)

        # Then
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'], "Not found.")
