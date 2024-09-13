from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_nested.routers import NestedSimpleRouter

from api.views.todo_view import TodoViewSet
from api.views.token_view import MyTokenObtainPairView
from api.views.user_view import UserViewSet
from api.views.task_view import TaskViewSet
from api.views.flat_share_view import FlatShareViewSet

router = routers.SimpleRouter()

# Register UserViewSet with the main router
router.register('user', UserViewSet, basename='user')

# Register FlatShareViewSet with the main router
router.register('flat', FlatShareViewSet, basename='flat')

# Create a NestedSimpleRouter for todos, nested under flats
todo_router = NestedSimpleRouter(router, r'flat', lookup='flat')
todo_router.register(r'todo', TodoViewSet, basename='flat-todo')

# Create a NestedSimpleRouter for tasks, nested under todos
task_router = NestedSimpleRouter(todo_router, r'todo')
task_router.register(r'task', TaskViewSet, basename='todo-task')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/', include(todo_router.urls)),
    path('api/v1/', include(task_router.urls)),
    path('api/v1/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Custom token to get more user data
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
