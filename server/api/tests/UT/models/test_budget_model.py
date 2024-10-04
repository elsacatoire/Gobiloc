from django.test import TestCase
from api.models import Budget, FlatShare


class BudgetModelTest(TestCase):

    # GIVEN
    def setUp(self):
        # Create flat share instance to use in the test
        self.flat_share = FlatShare.objects.create(name="Test FlatShare")

    def test_create_budget(self):
        # WHEN
        budget = Budget.objects.create(name="Monthly Budget", flat_share=self.flat_share)

        # THEN
        self.assertEqual(budget.name, "Monthly Budget")

        self.assertEqual(budget.flat_share, self.flat_share)

    def test_budget_str_representation(self):
        budget = Budget.objects.create(name="Monthly Budget", flat_share=self.flat_share)
        self.assertEqual(str(budget), "Monthly Budget")
