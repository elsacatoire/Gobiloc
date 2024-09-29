# api/serializers/budget_serializer.py
from rest_framework.serializers import ModelSerializer

from api.models.budget_model import Budget
from api.serializers.expense_serializer import ExpenseSerializer


class BudgetSerializer(ModelSerializer):
    expenses = ExpenseSerializer(many=True, read_only=True)

    class Meta:
        model = Budget
        fields = "__all__"
