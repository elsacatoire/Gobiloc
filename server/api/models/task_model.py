# api/models/task_model.py
from django.db import models
from django.db.models import BooleanField, CharField, DateTimeField, Model


class Task(Model):
    """
    Represents a task entity in the database, associated with a specific checklist item.

    Attributes:
        to-do (ForeignKey): A foreign key linking the task to a To-do object, with a related name "tasks".
                           Deleting the To-do will also delete associated tasks.
        content (CharField): The content or description of the task with a maximum length of 127 characters.
        done (BooleanField): A boolean field indicating whether the task is completed. Defaults to False.
        update_date (DateTimeField): The date and time when the task was last updated. Automatically set to the
                                     current date and time whenever the task is modified.
    """

    todo = models.ForeignKey("Todo", related_name="tasks", on_delete=models.CASCADE)
    content = CharField(max_length=127)
    done = BooleanField(default=False)
    update_date = DateTimeField(auto_now=True)
