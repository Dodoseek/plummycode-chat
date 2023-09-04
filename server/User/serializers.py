""" Serializers for User App """
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework.serializers import (CharField, ImageField, ModelSerializer,
                                        SerializerMethodField)

User = get_user_model()


class UserSerializer(ModelSerializer):
    """ User's model Serializer """
    image = ImageField(required=False)
    full_name = SerializerMethodField()

    class Meta:
        model = User
        fields = ("id",
                  "username",
                  'full_name',
                  "first_name",
                  "last_name",
                  "email",
                  "image",
                  "slug"
                  )

    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}' if obj.first_name and obj.last_name else obj.username


class AllUsersSerializer(ModelSerializer):
    """ All Users model Serializer """
    image = ImageField(required=False)
    full_name = SerializerMethodField()

    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}' if obj.first_name and obj.last_name else obj.username

    class Meta:
        model = User
        fields = ("id", "username", 'full_name', "first_name", "last_name", "image", "slug")


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
