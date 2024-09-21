from rest_framework import status
from rest_framework.response import Response


class CheckEmptyPatchMixin:
    def partial_update(self, request, *args, **kwargs):
        if not request.data:
            return Response(
                {"detail": "The request body is empty."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().partial_update(request, *args, **kwargs)
