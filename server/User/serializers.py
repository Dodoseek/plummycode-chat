""" Serializers for User App """
from django.contrib.auth import get_user_model
from rest_framework.serializers import (CharField, DateTimeField, ImageField,
                                        ListField, ModelSerializer, Serializer)

User = get_user_model()


class UserSerializer(ModelSerializer):
    """ User's model Serializer """
    password = CharField(write_only=True)
    pictures = ListField(child=ImageField(),
                         allow_empty=True,
                         read_only=True,
                         )

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
                  "pictures",
                  "slug"
                  )


class AllUsersSerializer(ModelSerializer):
    """ All Users model Serializer """
    pictures = ListField(child=ImageField(),
                         allow_empty=True,
                         read_only=True,
                         )

    class Meta:
        model = User
        fields = ("id", "username", "first_name", "last_name", "pictures", "slug")


class UserLoginSerializer(ModelSerializer):
    """ User's model Serializer """
    class Meta:
        model = User
        fields = (
            "email",
            "password",
        )


# pylint: disable=W0223
class UserLoginResponseSerializer(Serializer):
    """ Response's model Serializer """
    expiry = DateTimeField()
    token = CharField()
    user = UserSerializer()
