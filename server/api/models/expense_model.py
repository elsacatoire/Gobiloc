from django.db.models import CASCADE, DecimalField, ForeignKey, Model, TextField


class Expense(Model):
    budget = ForeignKey("Budget", related_name="expenses", on_delete=CASCADE)
    description = TextField()
    amount = DecimalField(max_digits=10, decimal_places=2)
    user = ForeignKey("User", related_name="users", on_delete=CASCADE)

    def __str__(self):
        return f"{self.description} - {self.amount} €"
