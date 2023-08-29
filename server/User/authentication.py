""" Simple JWT Authentication classes """
# pylint: disable=W0223
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from allauth.account.auth_backends import AuthenticationBackend


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


class AllowAllUsersModelBackend(AuthenticationBackend):

    def user_can_authenticate(self, user):
        return True
