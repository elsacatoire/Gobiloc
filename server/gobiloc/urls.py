from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from api.views.todo_view import TodoViewSet
from api.views.user_view import UserViewSet
from api.views.task_view import TaskViewSet
from api.views.flat_share_view import FlatShareViewSet

router = routers.SimpleRouter()

router.register('users', UserViewSet, basename='user')
router.register('todos', TodoViewSet, basename='todo')
router.register('tasks', TaskViewSet, basename='task')
router.register('flats', FlatShareViewSet, basename='flat')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
