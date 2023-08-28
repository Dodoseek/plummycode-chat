""" Serializers for Chat App """
from rest_framework.serializers import ImageField, ModelSerializer
# pylint: disable=E0401
from User.serializers import AllUsersSerializer

from .models import Chat


class ChatSerializer(ModelSerializer):
    """ Chat's model Serializer """
    image = ImageField()

    class Meta:
        """ Meta class """
        model = Chat
        fields = ("id", "users", "image")


class MyChatsSerializer(ModelSerializer):
    """ Chat's model Serializer """
    users = AllUsersSerializer(many=True)
    image = ImageField()

    class Meta:
        """ Meta class """
        model = Chat
        fields = ("id", "image", "users")
