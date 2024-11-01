# api/serializers/expense_serializer.py
from api.models.expense_model import Expense
from rest_framework import serializers


class ExpenseSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Expense
        fields = ["id", "budget", "description", "amount", "username", "date"]