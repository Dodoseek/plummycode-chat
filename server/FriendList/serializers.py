# pylint: disable=E0401
from rest_framework import status
from rest_framework.response import Response
from rest_framework.serializers import (BooleanField, CharField, DateTimeField,
                                        IntegerField, ModelSerializer)
from User.serializers import AllUsersSerializer

from .models import FriendList, FriendRequest


class FriendListSerializer(ModelSerializer):
    """ Friend List Model Serializer """
    user = AllUsersSerializer(read_only=True)
    friends = AllUsersSerializer(many=True, read_only=True)

    class Meta:
        model = FriendList
        fields = ("user", "friends")


class MetaData:
    class Meta:
        model = FriendRequest
        fields = ("id", "receiver", "sender", "is_active", "timestamp")


class RequestSerializer(MetaData, ModelSerializer):
    """ Serializer for sending a friend request """
    is_active = BooleanField(read_only=True)
    sender = AllUsersSerializer(read_only=True)
    receiver = AllUsersSerializer(read_only=True)
    user = IntegerField(write_only=True)
    timestamp = DateTimeField(format="%Y.%m.%d %H:%M", read_only=True)

    class Meta:
        model = FriendRequest
        fields = ("id", "receiver", "sender", "is_active", "timestamp", "user")


class UpdateRequestSerializer(MetaData, ModelSerializer):
    """ Serializer for changing the status of a friend request """
    sender = CharField(read_only=True)
    receiver = CharField(read_only=True)
    timestamp = DateTimeField(format="%Y.%m.%d %H:%M", read_only=True)


class AcceptRequestSerializer(MetaData, ModelSerializer):
    """ Serializer for accepting/rejecting acceptance to the friends list """
    sender = CharField(read_only=True)
    receiver = CharField(read_only=True)
    timestamp = DateTimeField(format="%Y.%m.%d %H:%M", read_only=True)

    def update(self, instance: FriendRequest, validated_data: dict):
        if validated_data.get("is_active"):
            instance.accept()
        else:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT, data=None)
        return instance
