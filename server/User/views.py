# pylint: disable=W0622
from django.contrib.auth import login
from drf_spectacular.utils import OpenApiResponse, extend_schema
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutAllView as KnoxLogoutAllView
from knox.views import LogoutView as KnoxLogoutView
from rest_framework import permissions

from .auth import AuthTokenSerializer
# pylint: disable=E0401
# pylint: disable=W0611
from .scheme import KnoxTokenScheme
from .serializers import UserLoginResponseSerializer, UserLoginSerializer


class LoginView(KnoxLoginView):
    '''
    This view accepts only a post request with an empty body.
    '''
    permission_classes = (permissions.AllowAny,)

    @extend_schema(
        summary='Get a token',
        request=UserLoginSerializer,
        responses=UserLoginResponseSerializer,
    )
    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)


class LogoutView(KnoxLogoutView):
    '''
    This view accepts only a post request with an empty body. 
    It responds to Knox Token Authentication. 
    On a successful request, the token used to authenticate is deleted 
    from the system and can no longer be used to authenticate.
    '''
    @extend_schema(
        summary='Logout',
        request=None,
        responses=OpenApiResponse(),
        parameters=None
    )
    def post(self, request, format=None):
        return super().post(request, format)


class LogoutAllView(KnoxLogoutAllView):
    '''
    This view accepts only a post request with an empty body. 
    It responds to Knox Token Authentication. On a successful request, 
    the token used to authenticate, and all other tokens registered to the same User account, 
    are deleted from the system and can no longer be used to authenticate.
    '''
    @extend_schema(
        summary='Logout for all',
        request=None,
        responses=OpenApiResponse(),
        parameters=None
    )
    def post(self, request, format=None):
        return super().post(request, format)
