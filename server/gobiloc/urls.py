from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from api.views.todo_view import TodoViewSet
from api.views.user_view import UserViewSet

router = routers.SimpleRouter()

router.register('users', UserViewSet, basename='user')
router.register('todos', TodoViewSet, basename='todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
