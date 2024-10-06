from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import Budget, FlatShare, User


class BudgetViewSetTest(APITestCase):
    """Test suite for the BudgetViewSet."""

    def setUp(self):
        """Set up test data for the tests."""
        # Create a test user
        self.user = User.objects.create_user(username='testuser', email="testuser@test.com", password='testpassword')

        # Create flat share and associate with user
        self.flat_share = FlatShare.objects.create(name='Test FlatShare')
        self.user.flat_share = self.flat_share
        self.user.save()

        # URL for the BudgetViewSet with flat_id
        self.url = reverse('flat-budget-list', kwargs={'flat_pk': self.flat_share.id})

    def test_get_queryset_success(self):
        """Test that the queryset returns budgets associated with the flat share."""
        self.client.force_authenticate(user=self.user)  # Authenticate the user
        Budget.objects.create(name='Monthly Budget', flat_share=self.flat_share)

        response = self.client.get(self.url)

        # Check that the response is successful
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Monthly Budget')

    def test_get_queryset_not_found(self):
        """Test that a 404 is raised if flat_pk is missing."""
        # Attempt to access the queryset without flat_pk
        response = self.client.get(reverse('flat-budget-list', kwargs={'flat_pk': 999}))  # Use an invalid ID

        # Check that the response returns a 404
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_queryset_permission_denied(self):
        """Test that permission denied is raised when the user does not have access to the flat."""
        another_user = User.objects.create_user(username='anotheruser', password='anotherpassword')
        another_flat_share = FlatShare.objects.create(name='Another FlatShare')
        another_user.flat_share = another_flat_share
        another_user.save()

        self.client.force_authenticate(user=another_user)  # Authenticate another user

        # Attempt to access the queryset with the correct flat_pk.
        response = self.client.get(self.url)

        # Check that the response returns a 403 Forbidden
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
