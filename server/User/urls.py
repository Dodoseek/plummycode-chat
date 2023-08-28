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

# from allauth.socialaccount.views import signup
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView

from .api import AllUsersView
# pylint: disable=E0401
from .views import GoogleConnect, GoogleLogin

app_name = "user"

urlpatterns = [

    # ACCOUNT ACTIONS
    path('account/login/', LoginView.as_view(), name='rest_login'),
    path('account/logout/', LogoutView.as_view(), name='rest_logout'),
    path('account/me/', UserDetailsView.as_view(), name='rest_user_details'),
    path('account/register/', RegisterView.as_view(), name='rest_register'),

    # JWT AUTH
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),

    # USER'S ACTIONS
    path('', AllUsersView.as_view({'get': 'list'}), name='all_users'),

    # SOCIAL AUTH
    path("google/", GoogleLogin.as_view(), name="google_login"),
    path("google/connect/", GoogleConnect.as_view(), name="google_connect"),
]
