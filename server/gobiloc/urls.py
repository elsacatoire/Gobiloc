from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework_nested.routers import NestedSimpleRouter
from rest_framework_simplejwt.views import TokenRefreshView

from api.views.budget_view import BudgetViewSet
from api.views.expense_view import ExpenseViewSet
from api.views.flat_share_view import FlatShareViewSet
from api.views.task_view import TaskViewSet
from api.views.todo_view import TodoViewSet
from api.views.token_view import MyTokenObtainPairView
from api.views.user_view import UserViewSet
from api.views.invitation_view import CreateInvitationViewSet, AcceptInvitationViewSet

router = routers.SimpleRouter()

# Register UserViewSet with the main router
router.register("user", UserViewSet, basename="user")

# Register FlatShareViewSet with the main router
router.register("flat", FlatShareViewSet, basename="flat")

# Create a NestedSimpleRouter for creating invite, nested under flats
create_invite_router = NestedSimpleRouter(router, r"flat", lookup="flat")
create_invite_router.register(r"create-invite", CreateInvitationViewSet, basename="create-invite")

router.register("accept-invite", AcceptInvitationViewSet, basename="accept-invite")

# Create a NestedSimpleRouter for todos, nested under flats
todo_router = NestedSimpleRouter(router, r"flat", lookup="flat")
todo_router.register(r"todo", TodoViewSet, basename="flat-todo")

# Create a NestedSimpleRouter for tasks, nested under todos
task_router = NestedSimpleRouter(todo_router, r"todo", lookup="todo")
task_router.register(r"task", TaskViewSet, basename="todo-task")

# Create a NestedSimpleRouter for budget, nested under flats
budget_router = NestedSimpleRouter(router, r"flat", lookup="flat")
budget_router.register(r"budget", BudgetViewSet, basename="flat-budget")

# Create a NestedSimpleRouter for expenses, nested under budget
expense_router = NestedSimpleRouter(budget_router, r"budget", lookup="budget")
expense_router.register(r"expense", ExpenseViewSet, basename="budget-expense")

prefix = "api/v1/"
urlpatterns = [
    path("admin/", admin.site.urls),
    path(prefix, include(router.urls)),
    path(prefix, include(create_invite_router.urls)),
    path(prefix, include(todo_router.urls)),
    path(prefix, include(task_router.urls)),
    path(prefix, include(budget_router.urls)),
    path(prefix, include(expense_router.urls)),
    path(
        f"{prefix}token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"
    ),  # Custom token to get more user data
    path(f"{prefix}token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
