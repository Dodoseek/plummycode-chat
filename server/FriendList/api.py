""" API Scripts for User """
# pylint: disable=E0401
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.generics import (CreateAPIView, DestroyAPIView,
                                     GenericAPIView, ListAPIView,
                                     RetrieveAPIView, UpdateAPIView)
from rest_framework.response import Response

from .models import FriendList, FriendRequest
from .permissions import (NotInFriendList, RequestDoesNotExist,
                          RequestFromSender, SenderIsNotReceiver)
from .serializers import (AcceptRequestSerializer, CreateRequestSerializer,
                          FriendListSerializer, ReceiverRequestSerializer,
                          SenderRequestSerializer, UpdateRequestSerializer)

# from User.models import User


class FriendListView(RetrieveAPIView, GenericAPIView):
    """ 
    Takes *user ID* from URL returns a list of his friends
    """

    lookup_field = "user"
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FriendListSerializer

    def get_queryset(self):
        return FriendList.objects.filter(user__id=self.kwargs['user'])


class RemoveFromFriendListView(DestroyAPIView):
    """
    Takes the *user ID* from the URL and removes it from
    the list of friends of the user who sent the request

    """
    serializer_class = FriendListSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def delete(self, request, *args, **kwargs):
        friend = get_object_or_404(get_user_model(), pk=kwargs['user'])
        user = get_object_or_404(get_user_model(), pk=self.request.user.user_id)

        instance = self.get_queryset()
        users_friendlist = get_object_or_404(FriendList, user=friend)

        instance.remove_friend(friend)
        users_friendlist.remove_friend(user)

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def get_queryset(self):
        query = {'user__username': self.request.user.username}
        return get_object_or_404(FriendList, **query)


class GetReceiverRequestView(ListAPIView, GenericAPIView):
    """ 
    Returns a list of users who have sent a request to add the current user to the friends list

    """
    serializer_class = ReceiverRequestSerializer
    lookup_field = "receiver"
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return FriendRequest.objects.filter(is_active=True,
                                            receiver__username=self.request.user.username)


class GetSenderRequestView(GetReceiverRequestView):
    """ 
    Returns a list of users to whom the current user has sent a friend request
    """
    lookup_field = "sender"
    serializer_class = SenderRequestSerializer

    def get_queryset(self):
        return FriendRequest.objects.filter(is_active=True,
                                            sender__username=self.request.user.username)


class CreateRequestView(CreateAPIView):
    """
    Takes the values *sender* and *receiver* in the body of the POST request 
    and creates a new request to add to the friends list.
    """
    serializer_class = CreateRequestSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        RequestFromSender,
        SenderIsNotReceiver,
        RequestDoesNotExist,
        NotInFriendList
    ]


class UpdateRequestView(UpdateAPIView, GenericAPIView):
    """
    Takes the value *receiver* from the path URL and takes 
    the value *is_active* in the body of the PUT or PATCH 
    request to update the status of the request
    """
    serializer_class = UpdateRequestSerializer
    lookup_field = "receiver"
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return FriendRequest.objects.filter(is_active=True,
                                            sender__username=self.request.user.username)


class AcceptRequestView(UpdateRequestView):
    """
    Takes the *user ID* from the URL and the *is_active* value 
    from the body of the PUT or PATCH request. 
    If *is_active* is True, it adds the user to the friends list, 
    otherwise it makes the request inactive.
    """
    serializer_class = AcceptRequestSerializer
    lookup_field = "sender"

    def get_queryset(self):
        return FriendRequest.objects.filter(is_active=True,
                                            receiver__username=self.request.user.username)
