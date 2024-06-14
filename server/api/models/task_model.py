# api/models/task_model.py

from django.db.models import Model, ForeignKey, CharField, CASCADE, DateTimeField, BooleanField


class Task(Model):
    todo = ForeignKey("Todo", on_delete=CASCADE)
    content = CharField(max_length=127)
    done = BooleanField(default=False)
    update_date = DateTimeField(auto_now=True)
