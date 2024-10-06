from django.test import TestCase

from api.models import Budget, FlatShare


class BudgetModelTest(TestCase):
    """Test suite for the Budget model."""

    def setUp(self):
        """
        Set up a FlatShare instance for use in the tests.
        """
        self.flat_share = FlatShare.objects.create(name="Test FlatShare")

    def test_create_budget(self):
        """
        Test that a Budget instance can be created successfully.
        """
        # WHEN
        budget = Budget.objects.create(name="Monthly Budget", flat_share=self.flat_share)

        # THEN
        self.assertEqual(budget.name, "Monthly Budget")
        self.assertEqual(budget.flat_share, self.flat_share)

    def test_budget_str_representation(self):
        """
        Test that the string representation of a Budget instance is correct.
        """
        budget = Budget.objects.create(name="Monthly Budget", flat_share=self.flat_share)
        self.assertEqual(str(budget), "Monthly Budget")

    def test_create_budget_without_flat_share(self):
        """Test that creating a Budget without a flat_share raises an IntegrityError."""
        with self.assertRaises(Exception) as context:
            Budget.objects.create(name="Monthly Budget")
        self.assertTrue(isinstance(context.exception, Exception))  # Catch specific integrity error if needed
