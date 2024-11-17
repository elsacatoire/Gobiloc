from rest_framework import serializers
from api.models import User, Expense
from django.db.models import Sum


class UserExpensesSerializer(serializers.ModelSerializer):
    total_expenses = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'total_expenses']

    def get_total_expenses(self, user):
        # Calculate the total amount of expenses for this user
        total = Expense.objects.filter(user=user).aggregate(total_amount=Sum('amount'))['total_amount']
        return total if total is not None else 0
