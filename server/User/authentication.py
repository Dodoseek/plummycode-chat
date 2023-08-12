""" Simple JWT Authentication classes """
# pylint: disable=W0223
from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView, TokenVerifyView)


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token = super().get_token(user)
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser

        return token


@extend_schema(tags=["User"])
class TokenObtain(TokenObtainPairView):

    @extend_schema(
        summary='Get an access token',
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


@extend_schema(tags=["User"])
class TokenRefresh(TokenRefreshView):
    @extend_schema(
        summary='Get a JSON access type web token if the update token is valid',
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


@extend_schema(tags=["User"])
class TokenVerify(TokenVerifyView):
    @extend_schema(
        summary='Check if the token is valid',
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
