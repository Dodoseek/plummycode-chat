""" API Scripts for Chat """


from rest_framework import permissions
from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView

from .models import Chat, Message
from .permissions import ItHasFriends
from .serializers import ChatSerializer, MyChatsSerializer


class CreateChatView(CreateAPIView, ListAPIView, GenericAPIView):
    """ 
    Create a chat object

    The first id from the list must belong to the one 
    who creates the chat. After him, all the remaining 
    chat members.

    """

    model = Chat
    permission_classes = [
        permissions.IsAuthenticated,
        ItHasFriends,
    ]
    serializer_class = ChatSerializer

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == "GET":
            return MyChatsSerializer
        return self.serializer_class

    def get_queryset(self):
        if self.request.method == "GET":
            return Chat.objects.filter(users__id=self.request.user.user_id)
        return Chat.objects.all()


class SendMessageView(CreateAPIView):
    """
    Sending a message to the user with the ID specified in the request body 
    from the person who sent the request
    """
    model = Message
    permission_classes = [
        permissions.IsAuthenticated,

    ]
