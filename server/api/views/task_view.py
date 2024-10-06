# api/views/task_view.py
# Controller
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.viewsets import ModelViewSet

from api.mixins.check_empty_patch_mixin import CheckEmptyPatchMixin
from api.models import FlatShare, Todo
from api.models.task_model import Task
from api.serializers.task_serializer import TaskSerializer


class TaskViewSet(CheckEmptyPatchMixin, ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        flat_id = self.kwargs["flat_pk"]
        todo_id = self.kwargs["todo_pk"]

        if not flat_id or not todo_id:
            raise NotFound(detail="flat_id or todo_id is required", code=404)

        try:
            todo = Todo.objects.get(pk=todo_id)
        except Todo.DoesNotExist:
            raise NotFound(detail="No checklist with this ID.", code=404)

        try:
            flat = FlatShare.objects.get(pk=flat_id)
        except FlatShare.DoesNotExist:
            raise NotFound("No flat share with this ID.", code=404)

        if flat != todo.flat_share:
            raise PermissionDenied(
                "You are not allowed to perform this action.", code=403
            )

        if self.request.user.flat_share != flat:
            raise PermissionDenied(
                "You are not allowed to perform this action.", code=403
            )

        return Task.objects.filter(todo=todo)

    # partial_update = PATCH (?)
