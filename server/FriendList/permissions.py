""" Permissions for User Model """
from django.db.models import Q
from django.http import HttpRequest
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission

from .models import FriendList, FriendRequest


class SenderIsNotReceiver(BasePermission):
    """
    If the Sender is a receiver, throws an exception,
    otherwise returns True
    """

    def has_permission(self, request: HttpRequest, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        if not request.data.get('receiver') == request.user.id:
            return True
        raise PermissionDenied(
            detail=_("You can't send a friend list request to yourself"))


class RequestDoesNotExist(BasePermission):
    """
    If the sender has already sent an active request to this user, it
    will return the value False, otherwise the value True

    """

    def has_permission(self, request: HttpRequest, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        sender = request.user.id
        if request.method == "POST":
            receiver = request.data.get('receiver')
            if not FriendRequest.objects.filter(Q(sender__id=sender, receiver__id=receiver) |
                                                Q(sender__id=receiver, receiver__id=sender),
                                                is_active=True).exists():
                return True

            raise PermissionDenied(
                detail=_("You have an active request associated with this user"))

        if request.method == "DELETE":
            receiver = view.kwargs.get('receiver', None)
            if FriendRequest.objects.filter(Q(sender__id=sender, receiver__id=receiver) |
                                            Q(sender__id=receiver, receiver__id=sender),
                                            is_active=True).exists() and receiver:
                return True

            raise PermissionDenied(
                detail=_("Request not found"))

        return True


class NotInFriendList(BasePermission):
    """
    If sender has sent a request, it returns True, otherwise
    it returns False

    """

    def has_permission(self, request: HttpRequest, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        sender = request.user.id
        if request.method == "POST":
            receiver = request.data.get('receiver')
            if not FriendList.objects.filter(Q(user__id=sender, friends__id=receiver) |
                                             Q(user__id=receiver, friends__id=sender)).exists():
                return True
            raise PermissionDenied(
                detail=_("This user is already in your friends list"))

        return True
