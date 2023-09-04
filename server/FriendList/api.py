""" API Scripts for User """
# pylint: disable=E0401
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import (OpenApiParameter, OpenApiResponse,
                                   extend_schema)
from rest_framework import permissions, status
from rest_framework.mixins import (CreateModelMixin, DestroyModelMixin,
                                   ListModelMixin, RetrieveModelMixin,
                                   UpdateModelMixin)
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .models import FriendList, FriendRequest
from .permissions import (NotInFriendList, RequestDoesNotExist,
                          SenderIsNotReceiver)
from .serializers import (AcceptRequestSerializer, FriendListSerializer,
                          RequestSerializer)


@extend_schema(tags=["Fiend List"])
class FriendListViewSet(RetrieveModelMixin, DestroyModelMixin, GenericViewSet):
    """ 
    Takes *user ID* from URL returns a list of his friends
    """

    lookup_field = "user"
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = FriendListSerializer

    @extend_schema(
        description="Accepts the user's *id* from the URL and removes"
        "it from the friends list. Returns an updated list of"
        "friends without the deleted user.",
        summary='Delete a user from the friends list',
        parameters=[
            OpenApiParameter(
                name='user',
                location=OpenApiParameter.PATH,
                description='user *id* parameter',
                required=True,
                type=int
            ),
        ],
    )
    def destroy(self, request, *args, **kwargs):
        friend = get_object_or_404(get_user_model(), pk=kwargs['user'])
        user = get_object_or_404(get_user_model(), pk=self.request.user.id)

        instance = self.get_queryset()
        users_friendlist = get_object_or_404(FriendList, user=friend)

        instance.remove_friend(friend)
        users_friendlist.remove_friend(user)

        FriendRequest.objects.delete(Q(sender__id=user, receiver__id=friend) |
                                     Q(sender__id=friend, receiver__id=user),
                                     is_active=False)

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @extend_schema(
        description="Accepts the *id* of the user from the URL and shows all his friends",
        summary='Get a list of friends of the specified user',
        parameters=[
            OpenApiParameter(
                name='user',
                location=OpenApiParameter.PATH,
                description='user *id* parameter',
                required=True,
                type=int
            ),
        ],
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def get_queryset(self):
        if self.request.method == "DELETE":
            query = {'user__username': self.request.user.username}
            return get_object_or_404(FriendList, **query)
        # For GET Requests:
        return FriendList.objects.filter(user__id=self.kwargs['user'])


@extend_schema(tags=["Fiend List"])
class RequestViewSet(CreateModelMixin,
                     DestroyModelMixin,
                     ListModelMixin,
                     GenericViewSet):
    """
    Takes the value *recipient* in the body of the POST request
    and creates a new friend list request on behalf of the user who sent the request.
    """

    serializer_class = RequestSerializer
    lookup_field = "receiver"
    permission_classes = [
        permissions.IsAuthenticated,
        SenderIsNotReceiver,
        RequestDoesNotExist,
        NotInFriendList
    ]

    @extend_schema(
        description="Takes the required parameter *purpose*"
        "in the body of the POST request and returns the object of the created request",
        summary='Create a request to add to friends list',
    )
    def create(self, request: HttpRequest, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        sender = get_object_or_404(get_user_model(), pk=request.user.id)
        receiver = get_object_or_404(get_user_model(), pk=request.data['user'])
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['sender'] = sender
        serializer.validated_data['receiver'] = receiver
        del serializer.validated_data['user']
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @extend_schema(
        description="Has no required parameters. Returns a list of requests sent by this user.",
        summary='Get a list of sent requests',
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(
        description="Accepts the required parameter *id* of the user to whom the friend request"
        "was sent. Returns an empty response with the status 204 on successful deletion.",
        summary='Delete a friend request sent',
        parameters=[
            OpenApiParameter(
                name='receiver',
                location=OpenApiParameter.PATH,
                description='receiver *id* parameter',
                required=True,
                type=int
            ),
        ],
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def get_serializer_class(self):
        method = self.request.method
        if method in ("DELETE", "POST"):
            return self.serializer_class
        if method in ("GET",):
            return RequestSerializer
        return self.serializer_class

    def get_queryset(self):
        method = self.request.method
        if method in ("DELETE", "POST"):
            return FriendRequest.objects.filter(is_active=True,
                                                sender__id=self.request.user.id)
        self.lookup_field = "sender"
        if method in ("GET",):
            return FriendRequest.objects.filter(is_active=True,
                                                sender__id=self.request.user.id)


@extend_schema(tags=["Fiend List"])
@extend_schema(methods=['PATCH'],
               exclude=True)
class UpdateRequestViewSet(UpdateModelMixin, GenericViewSet):
    lookup_field = 'sender'
    serializer_class = AcceptRequestSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    @extend_schema(
        description="",
        summary='Accept/reject a friend request',
        parameters=[
            OpenApiParameter(
                name='sender',
                location=OpenApiParameter.PATH,
                description='sender *id* parameter',
                required=True,
                type=int
            ),
        ],
        responses={
            status.HTTP_200_OK: AcceptRequestSerializer,
            status.HTTP_204_NO_CONTENT: OpenApiResponse(
                response=None,
                description='No response body'),
        }
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def get_queryset(self):
        return FriendRequest.objects.filter(is_active=True,
                                            receiver__id=self.request.user.id)


@extend_schema(tags=["Fiend List"])
class ReceiverRequestViewSet(ListModelMixin, GenericViewSet):
    """ 
    Returns a list of users who have sent a request to add the current user to the friends list

    """

    serializer_class = RequestSerializer
    lookup_field = "receiver"
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    @extend_schema(
        description="Returns a list of users who have "
        "sent a request to add the current user to the friends list",
        summary='Get a list of senders',
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        return FriendRequest.objects.filter(is_active=True,
                                            receiver__username=self.request.user.username)
