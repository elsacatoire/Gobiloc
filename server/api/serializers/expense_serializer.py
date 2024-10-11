# api/serializers/expense_serializer.py
from rest_framework.serializers import ModelSerializer

from api.models.expense_model import Expense


class ExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = ["id", "budget", "description", "amount", "user"]