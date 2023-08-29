""" Serializers for User App """
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework.serializers import CharField, ImageField, ModelSerializer

User = get_user_model()


class UserSerializer(ModelSerializer):
    """ User's model Serializer """
    image = ImageField(required=False)

    class Meta:
        model = User
        fields = ("id",
                  "username",
                  "first_name",
                  "last_name",
                  "email",
                  "image",
                  "slug"
                  )


class AllUsersSerializer(ModelSerializer):
    """ All Users model Serializer """
    image = ImageField(required=False)

    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "image", "slug")


# pylint: disable=W0223
class RegisterUserSerializer(RegisterSerializer):

    """ User's model Register Serializer """
    first_name = CharField()
    last_name = CharField()

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['first_name'] = self.validated_data.get('first_name', '')
        data_dict['last_name'] = self.validated_data.get('last_name', '')
        return data_dict
