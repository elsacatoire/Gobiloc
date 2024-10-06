from django.test import TestCase
from api.models import FlatShare, Budget
from api.serializers.budget_serializer import BudgetSerializer


class BudgetSerializerTest(TestCase):

    def setUp(self):
        # Create a test FlatShare object
        self.flat_share = FlatShare.objects.create(
            name="Test FlatShare"
        )
        # Create a test Budget object
        self.budget = Budget.objects.create(
            name='Test Budget',
            flat_share=self.flat_share
        )

    def test_budget_serializer_valid_data(self):
        """Test that the serializer validates with valid data."""
        data = {
            'name': 'Test Budget',
            'flat_share': self.flat_share.id
        }
        serializer = BudgetSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_budget_serializer_data(self):
        """Test that the serializer returns the expected data."""
        serializer = BudgetSerializer(instance=self.budget)
        expected_data = {
            'id': self.budget.id,
            'name': 'Test Budget',
            'flat_share': self.flat_share.id,
            'expenses': []  # Initially, there are no expenses
        }
        self.assertEqual(serializer.data, expected_data)

    def test_budget_serializer_create(self):
        """Test that the serializer can create a new Budget instance."""
        data = {
            'name': 'New Test Budget',
            'flat_share': self.flat_share.id
        }
        serializer = BudgetSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        serializer.save()
        self.assertEqual(Budget.objects.count(), 2)

    def test_budget_serializer_update(self):
        """Test that the serializer can update an existing Budget instance."""
        data = {
            'name': 'Updated Test Budget',
            'flat_share': self.flat_share.id
        }
        serializer = BudgetSerializer(instance=self.budget, data=data)
        self.assertTrue(serializer.is_valid())
        serializer.save()
        self.budget.refresh_from_db()  # Refresh to get updated data
        self.assertEqual(self.budget.name, 'Updated Test Budget')

    def test_budget_serializer_missing_name(self):
        """Test that the serializer raises a validation error with missing name."""
        data = {
            'flat_share': self.flat_share.id
        }
        serializer = BudgetSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)  # 'name' is required

    def test_budget_serializer_missing_flat_share(self):
        """Test that the serializer raises a validation error with missing flat_share."""
        data = {
            'name': 'Test Budget'
        }
        serializer = BudgetSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('flat_share', serializer.errors)  # 'flat_share' is required

    def test_budget_serializer_invalid_flat_share(self):
        """Test that the serializer raises a validation error with an invalid flat_share."""
        data = {
            'name': 'Test Budget',
            'flat_share': 9999
        }
        serializer = BudgetSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('flat_share', serializer.errors)  # 'flat_share' must point to a valid FlatShare object

    def test_budget_serializer_too_long_name(self):
        """Test that the serializer raises a validation error when the name exceeds max_length."""
        data = {
            'name': 'a' * 101,  # Max length is 100
            'flat_share': self.flat_share.id
        }
        serializer = BudgetSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)  # 'name' should fail due to max_length
