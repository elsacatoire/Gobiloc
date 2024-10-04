# api/views/budget_view.py
# Controller

from django.shortcuts import get_object_or_404
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.viewsets import ModelViewSet

from api.models.budget_model import Budget, FlatShare
from api.serializers.budget_serializer import BudgetSerializer


class BudgetViewSet(ModelViewSet):
    serializer_class = BudgetSerializer

    def get_queryset(self):
        flat_id = self.kwargs.get("flat_pk")

        if flat_id is None:
            raise NotFound(detail="Flat ID is missing in the URL.", code=404)

        flat = get_object_or_404(FlatShare, pk=flat_id)

        if self.request.user.flat_share != flat:
            raise PermissionDenied(
                detail="The requested flat is not associated with the current user."
            )

        return Budget.objects.filter(flat_share=flat)

    def perform_create(self, serializer):
        flat_id = self.kwargs.get("flat_pk")
        flat = get_object_or_404(FlatShare, pk=flat_id)
        serializer.save(flat_share=flat)