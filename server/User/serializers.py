""" Serializers for User App """
from dj_rest_auth.app_settings import api_settings
from django.contrib.auth import get_user_model
from rest_framework.serializers import (CharField, ImageField, ModelSerializer,
                                        Serializer, SerializerMethodField)

User = get_user_model()


class UserSerializer(ModelSerializer):
    """ User's model Serializer """
    password = CharField(write_only=True)
    image = ImageField(required=False)

    def create(self, validated_data: dict):

        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            email=validated_data['email'],
        )

        user.set_password(validated_data["password"])
        user.save()
        return user

    class Meta:
        model = User
        fields = ("id",
                  "username",
                  "password",
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
