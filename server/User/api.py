""" API Scripts for User """

from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from rest_framework.generics import (CreateAPIView, GenericAPIView,
                                     ListAPIView, RetrieveAPIView)

from .permissions import IsOwnerOrAdmin
from .serializers import AllUsersSerializer, UserSerializer

User = get_user_model()


class UserView(RetrieveAPIView, GenericAPIView):
    """ 
    Takes the user *ID* and returns his 
    id, username, first_name, last_name, email, 
    image and slug 

    """
    permission_classes = [
        IsOwnerOrAdmin,
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()


class AllUsersView(ListAPIView, GenericAPIView):
    """
    Accepts the number of pages 
    and filters and returns a list 
    of all users with the fields 
    *id* *first name* *last name*

    """

    serializer_class = AllUsersSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        return User.objects.all()


class CreateUserView(CreateAPIView):
    """ 
    Takes *username*, *password*, first_name, 
    last_name, email, user and returns its 
    created instance 

    """
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer
