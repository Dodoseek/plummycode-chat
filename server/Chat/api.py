""" API Scripts for Chat """

from django.http import HttpRequest
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, status
from rest_framework.authentication import TokenAuthentication
# status
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.response import Response
# from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Chat, Message
from .permissions import ItHasFriends, UsersListNotEmpty
from .serializers import ChatSerializer, MyChatsSerializer


@extend_schema(tags=["Chat"])
class ChatView(CreateModelMixin, ListModelMixin, GenericViewSet):
    """ 
    Create a chat object

    The first id from the list must belong to the one 
    who creates the chat. After him, all the remaining 
    chat members.

    """

    model = Chat
    permission_classes = [
        permissions.IsAuthenticated,
        UsersListNotEmpty,
        ItHasFriends,
    ]

    serializer_class = ChatSerializer

    @extend_schema(
        description='Creating a chat with specifying the *id*'
        'of users in the list of the *users* parameter.',
        summary='Create a chat',
        responses={
            status.HTTP_201_CREATED: MyChatsSerializer
        }
    )
    def create(self, request: HttpRequest, *args, **kwargs):
        request.data['users'].insert(0, request.user.id)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        chat = Chat.objects.get(id=serializer.data['id'])
        serializer = MyChatsSerializer(chat, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @extend_schema(
        description='A request that does not have required parameters. Returns a list of chats in which the authorized user is a member.',
        summary='Get a list of my chats'
    )
    def list(self, request, *args, **kwargs):
        # print(request)
        return super().list(request, *args, **kwargs)

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == "GET":
            return MyChatsSerializer
        return self.serializer_class

    def get_queryset(self):
        if self.request.method == "GET":
            return Chat.objects.filter(users__id=self.request.user.id)
        return Chat.objects.all()


@extend_schema(tags=["Chat"])
class SendMessageView(GenericViewSet):
    """
    Sending a message to the user with the ID specified in the request body 
    from the person who sent the request
    """
    model = Message
    permission_classes = [
        permissions.IsAuthenticated,

    ]
