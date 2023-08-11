""" Permissions for User Model """
from django.db.models import Q
from django.http import HttpRequest
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission

from .models import FriendList, FriendRequest


class RequestFromSender(BasePermission):
    """
    If sender has sent a request, 
    it returns True, otherwise
    it returns False

    """

    def has_permission(self, request: HttpRequest, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        if request.user.user_id == request.data.get('sender'):
            return True
        raise PermissionDenied(
            detail=_("You can't send a friendship request on someone else's behalf"))


class SenderIsNotReceiver(BasePermission):
    """
    If the Sender is a receiver, throws an exception, 
    otherwise returns True
    """

    def has_permission(self, request: HttpRequest, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        if not request.data.get('receiver') == request.data.get('sender'):
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
        sender = request.data.get('sender')
        receiver = request.data.get('receiver')
        if not FriendRequest.objects.filter(Q(sender=sender, receiver=receiver) |
                                            Q(sender=receiver, receiver=sender),
                                            is_active=True).exists():
            return True
        raise PermissionDenied(
            detail=_("You have an active request associated with this user"))


class NotInFriendList(BasePermission):
    """
    If sender has sent a request, it returns True, otherwise
    it returns False

    """

    def has_permission(self, request: HttpRequest, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        sender = request.data.get('sender')
        receiver = request.data.get('receiver')
        if not FriendList.objects.filter(Q(user=sender, friends__id=receiver) |
                                         Q(user=receiver, friends__id=sender)).exists():
            return True
        raise PermissionDenied(
            detail=_("This user is already in your friends list"))
