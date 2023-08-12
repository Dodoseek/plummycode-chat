# pylint: disable=E0401
from rest_framework import status
from rest_framework.response import Response
from rest_framework.serializers import (BooleanField, CharField,
                                        ModelSerializer,
                                        PrimaryKeyRelatedField)
from User.serializers import AllUsersSerializer

from .models import FriendList, FriendRequest


class FriendListSerializer(ModelSerializer):
    """ Friend List Model Serializer """
    user = AllUsersSerializer(read_only=True)
    friends = AllUsersSerializer(many=True, read_only=True)

    class Meta:
        model = FriendList
        fields = ("user", "friends")


class MetaClass:
    class Meta:
        model = FriendRequest
        fields = ("id", "receiver", "sender", "is_active", "timestamp")


class RequestSerializer(MetaClass, ModelSerializer):
    """ Serializer for sending a friend request """
    is_active = BooleanField(read_only=True)
    sender = PrimaryKeyRelatedField(read_only=True)


class SenderRequestSerializer(MetaClass, ModelSerializer):
    """ A sterilizer for displaying all sent active friend list requests """
    receiver = AllUsersSerializer()


class ReceiverRequestSerializer(MetaClass, ModelSerializer):
    """ A sterilizer for displaying all received active requests to the friends list """
    sender = AllUsersSerializer()


class UpdateRequestSerializer(MetaClass, ModelSerializer):
    """ Serializer for changing the status of a friend request """
    sender = CharField(read_only=True)
    receiver = CharField(read_only=True)


class AcceptRequestSerializer(MetaClass, ModelSerializer):
    """ Serializer for accepting/rejecting acceptance to the friends list """
    sender = CharField(read_only=True)
    receiver = CharField(read_only=True)

    def update(self, instance: FriendRequest, validated_data: dict):
        if validated_data.get("is_active"):
            instance.accept()
        else:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT, data=None)
        return instance
