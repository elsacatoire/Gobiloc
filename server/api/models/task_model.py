# api/models/task_model.py
from django.db import models
from django.db.models import BooleanField, CharField, DateTimeField, Model


class Task(Model):
    todo = models.ForeignKey("Todo", related_name="tasks", on_delete=models.CASCADE)
    content = CharField(max_length=127)
    done = BooleanField(default=False)
    update_date = DateTimeField(auto_now=True)
