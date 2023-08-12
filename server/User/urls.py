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

from .api import AllUsersView, UserView
from .authentication import TokenObtain, TokenRefresh, TokenVerify

# from rest_framework_simplejwt.views import (TokenObtainPairView,
#                                             TokenRefreshView, TokenVerifyView)


router = routers.SimpleRouter()
router.register(r'account', UserView, basename='user')

app_name = "user"

urlpatterns = [
    path('token/refresh/', TokenRefresh.as_view(), name='token_refresh'),
    path('token/', TokenObtain.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerify.as_view(), name='token_verify'),
    path('', include(router.urls)),
    path('', AllUsersView.as_view({'get': 'list'}), name="all_users"),
]
