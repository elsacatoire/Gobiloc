# api/views/expense_view.py
# Controller
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.viewsets import GenericViewSet

from api.models import Budget, Expense, FlatShare
from api.serializers.expense_serializer import ExpenseSerializer
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin


class ExpenseViewSet(GenericViewSet, CreateModelMixin, DestroyModelMixin):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        flat_id = self.kwargs["flat_pk"]
        budget_id = self.kwargs["budget_pk"]

        if not flat_id or not budget_id:
            raise NotFound(detail="flat_id or budget_id is required", code=404)

        try:
            budget = Budget.objects.get(pk=budget_id)
        except Budget.DoesNotExist:
            raise NotFound(detail="No flat share with this ID.", code=404)

        try:
            flat = FlatShare.objects.get(pk=flat_id)
        except FlatShare.DoesNotExist:
            raise NotFound("No flat share with this ID.", code=404)

        if flat != budget.flat_share:
            raise PermissionDenied(
                "You are not allowed to perform this action.", code=403
            )

        if self.request.user.flat_share != flat:
            raise PermissionDenied(
                "You are not allowed to perform this action.", code=403
            )

        return Expense.objects.filter(budget=budget)

    # partial_update = PATCH (?)