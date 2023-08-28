""" API Scripts for User """

from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import permissions
from rest_framework.mixins import (CreateModelMixin, ListModelMixin,
                                   RetrieveModelMixin)
from rest_framework.viewsets import GenericViewSet

from .permissions import IsOwnerOrAdmin
from .serializers import AllUsersSerializer, UserSerializer

User = get_user_model()


@extend_schema(tags=["users"])
class UserView(RetrieveModelMixin, CreateModelMixin, GenericViewSet):
    """ 
    Takes the user *ID* and returns his 
    id, username, first_name, last_name, email, 
    image and slug 

    """
    permission_classes = [
        IsOwnerOrAdmin,
    ]
    serializer_class = UserSerializer

    @extend_schema(
        description="Accepts the *id* of the user from the URL and shows all his friends",
        summary='Create a user',
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        description="Takes the user ID and returns his id,"
        "username, first_name, last_name, email, image and slug",
        summary='Get a detailed user',
        parameters=[
            OpenApiParameter(
                name='id',
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
        return User.objects.filter(id=self.request.user.id)


@extend_schema(tags=["users"])
class AllUsersView(ListModelMixin, GenericViewSet):
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

    @extend_schema(
        description="Takes the number of pages and filters and returns a list"
        "of all users with the fields id first name last name",
        summary='Get all users',
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        return User.objects.all()
