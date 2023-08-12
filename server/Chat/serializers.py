""" Serializers for Chat App """
from rest_framework.serializers import (DateTimeField, ImageField, ListField,
                                        ModelSerializer)
# pylint: disable=E0401
from User.serializers import AllUsersSerializer

from .models import Chat


class ChatSerializer(ModelSerializer):
    """ Chat's model Serializer """
    pictures = ListField(child=ImageField(),
                         allow_empty=True,
                         read_only=True,
                         )

    class Meta:
        """ Meta class """
        model = Chat
        fields = ("id", "users", "pictures")


class MyChatsSerializer(ModelSerializer):
    """ Chat's model Serializer """
    users = AllUsersSerializer(many=True)
    pictures = ListField(child=ImageField(),
                         allow_empty=True,
                         read_only=True,
                         )

    class Meta:
        """ Meta class """
        model = Chat
        fields = ("id", "pictures", "users")
