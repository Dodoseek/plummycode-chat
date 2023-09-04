""" Serializers for Chat App """
from rest_framework.serializers import (DateTimeField, ImageField,
                                        ModelSerializer)
# pylint: disable=E0401
from User.serializers import AllUsersSerializer

from .models import Chat, Message


class ChatSerializer(ModelSerializer):
    """ Chat's model Serializer """
    image = ImageField()

    class Meta:
        """ Meta class """
        model = Chat
        fields = ("id", "users", "image")


class MessageSerialiser(ModelSerializer):
    """ Message's model Serializer """
    date = DateTimeField(format="%Y.%m.%d %H:%M", read_only=True)

    class Meta:
        model = Message
        fields = ("user", "text", "date", "type_of")


class MyChatsSerializer(ModelSerializer):
    """ Chat's model Serializer """
    users = AllUsersSerializer(many=True)
    image = ImageField()
    last_message = MessageSerialiser()

    class Meta:
        """ Meta class """
        model = Chat
        fields = ("id", "image", "name", "last_message", "users")
