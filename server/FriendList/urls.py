"""
URL configuration for User application.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# pylint: disable=C0103

from django.urls import include, path
from rest_framework import routers

from .api import (FriendListViewSet, ReceiverRequestViewSet, RequestViewSet,
                  UpdateRequestViewSet)

router = routers.SimpleRouter()
router.register(r'friends', FriendListViewSet, basename='friendlist')
router.register(r'request', RequestViewSet, basename='request')
router.register(r'receiver', ReceiverRequestViewSet, basename='receiver')
router.register(r'update', UpdateRequestViewSet, basename='update')

app_name = "friendlist"

urlpatterns = [
    path('', include(router.urls)),
]
