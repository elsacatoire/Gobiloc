from django.contrib import admin

from api.models import Budget, Category, Expense, FlatShare, Task, Todo, User

admin.site.register(User)
admin.site.register(FlatShare)
admin.site.register(Todo)
admin.site.register(Task)
admin.site.register(Category)
admin.site.register(Budget)
admin.site.register(Expense)
