from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from api.views.user_view import UserViewSet

router = routers.SimpleRouter()

router.register('users', UserViewSet, basename='user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
