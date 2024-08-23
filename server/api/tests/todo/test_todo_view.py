from unittest import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
import json

from api.models import FlatShare, Todo


class TestTodoViewSet(TestCase):
    def setUp(self):
        self.url = '/api/todo/'
        self.client = APIClient()

    # Tests To-dos from a flat
    def test_get_todos_success(self):
        # Given
        flat_share = FlatShare.objects.create(name="Test FlatShare")
        todo1 = Todo.objects.create(flat_share=flat_share, name="Test Todo 1")
        todo2 = Todo.objects.create(flat_share=flat_share, name="Test Todo 2")
        url = reverse('todo-get-todos', kwargs={'flat_share_id': flat_share.id})

        # When
        response = self.client.get(url)

        # Then
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['todos']), 2)
        self.assertEqual(response.data['todos'][0]['name'], todo1.name)

    def test_get_todos_flat_has_no_todo(self):
        # Given
        flat_share_empty = FlatShare.objects.create(name="Test FlatShare")
        url_empty = reverse('todo-get-todos', kwargs={'flat_share_id': flat_share_empty.id})

        # When
        response = self.client.get(url_empty)

        # Then
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['todos']), 0)

    def test_get_todos_of_a_non_existing_flat(self):
        # Given
        url_not_existing_id_flat = reverse('todo-get-todos', kwargs={'flat_share_id': 999})

        # When
        response = self.client.get(url_not_existing_id_flat)

        # Then
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'], "Not found.")

    # Test a singular To-do
    def test_create_todo_success(self):
        # Given
        flat_share = FlatShare.objects.create(name="Test FlatShare")
        data = {'flat_share': flat_share.id, 'name': "New Todo"}
        pre_existing_todos_nb = Todo.objects.count()

        # When
        response = self.client.post(self.url, data, format='json')
        todo = Todo.objects.get(id=response.data['id'])

        # Then
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.count(), pre_existing_todos_nb + 1)
        self.assertEqual(todo.name, "New Todo")

    def test_update_todo_success(self):
        # Given
        flat_share = FlatShare.objects.create(name="Test FlatShare")
        todo = Todo.objects.create(flat_share=flat_share, name="Old Name")
        data = {'name': "Updated Name"}
        url = f'{self.url}{todo.id}/'

        # When
        response = self.client.patch(url, data=json.dumps(data), content_type='application/json')

        # Then
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Todo.objects.get(id=todo.id).name, "Updated Name")

    def test_delete_todo_success(self):
        # Given
        flat_share = FlatShare.objects.create(name="Test FlatShare to delete todo")
        todo = Todo.objects.create(flat_share=flat_share, name="Test Todo to delete")
        url = f'{self.url}{todo.id}/'
        todos_nb_before_delete = Todo.objects.count()

        # When
        response = self.client.delete(url)

        # Then
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), todos_nb_before_delete - 1)
