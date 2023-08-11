# pylint: disable=E0401
from rest_framework.serializers import BooleanField, CharField, ModelSerializer
from User.serializers import AllUsersSerializer

from .models import FriendList, FriendRequest


class FriendListSerializer(ModelSerializer):
    """ Friend List Model Serializer """
    user = AllUsersSerializer(read_only=True)
    friends = AllUsersSerializer(many=True, read_only=True)

    class Meta:
        model = FriendList
        fields = ("user", "friends")


class SenderRequestSerializer(ModelSerializer):
    """ A sterilizer for displaying all sent active friend list requests """
    receiver = AllUsersSerializer()

    class Meta:
        model = FriendRequest
        fields = ("id", "sender", "receiver", "is_active", "timestamp")


class ReceiverRequestSerializer(SenderRequestSerializer):
    """ A sterilizer for displaying all received active requests to the friends list """
    receiver = CharField()
    sender = AllUsersSerializer()


class CreateRequestSerializer(ModelSerializer):
    """ Serializer for sending a friend request """
    is_active = BooleanField(read_only=True)

    class Meta:
        model = FriendRequest
        fields = ("id", "sender", "receiver", "is_active", "timestamp")


class UpdateRequestSerializer(ModelSerializer):
    """ Serializer for changing the status of a friend request """
    sender = CharField(read_only=True)
    receiver = CharField(read_only=True)

    class Meta:
        model = FriendRequest
        fields = ("id", "sender", "receiver", "is_active", "timestamp")


class AcceptRequestSerializer(ModelSerializer):
    """ Serializer for accepting/rejecting acceptance to the friends list """
    sender = CharField(read_only=True)
    receiver = CharField(read_only=True)
    accept = BooleanField(read_only=True)

    def update(self, instance: FriendRequest, validated_data: dict):
        if validated_data.get("is_active"):
            instance.accept()
            instance.accept = True
        else:
            instance.reject()
            instance.accept = False
        return instance

    class Meta:
        model = FriendRequest
        fields = ("id", "sender", "receiver", "is_active", "timestamp", "accept")
