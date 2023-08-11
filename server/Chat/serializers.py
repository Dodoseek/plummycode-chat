""" Serializers for Chat App """
from rest_framework.serializers import (DateTimeField, ImageField, ListField,
                                        ModelSerializer)
# pylint: disable=E0401
from User.serializers import AllUsersSerializer

from .models import Chat, ImagesOfMessage, Message


class ChatSerializer(ModelSerializer):
    """ Chat's model Serializer """
    class Meta:
        """ Meta class """
        model = Chat
        fields = ("id", "users")


class MyChatsSerializer(ModelSerializer):
    """ Chat's model Serializer """
    users = AllUsersSerializer()

    class Meta:
        """ Meta class """
        model = Chat
        fields = ("id", "users")


class MessageSerializer(ModelSerializer):
    """ Message's model Serializer """

    date = DateTimeField(read_only=True)

    class Meta:
        """ Meta class """
        model = Message
        fields = ("id", "chat", "user", "text", "date")


class ImagesOfMessageSerializer(ModelSerializer):
    """ ImagesOfMessage's model Serializer """
    pictures = ListField(child=ImageField(),
                         allow_empty=True,
                         read_only=True,
                         )

    class Meta:
        """ Meta class """
        model = ImagesOfMessage
        fields = ("id", "pictures", "message")
