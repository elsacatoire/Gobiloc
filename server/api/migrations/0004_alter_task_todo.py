# Generated by Django 5.0.3 on 2024-09-01 08:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_alter_flatshare_description"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="todo",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="tasks",
                to="api.todo",
            ),
        ),
    ]
