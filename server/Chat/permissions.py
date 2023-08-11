""" Permissions for Chat Model """
import json

from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import gettext_lazy as _
# pylint: disable=E0401
from FriendList.models import FriendList
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import SAFE_METHODS, BasePermission

User = get_user_model()


class ItHasFriends(BasePermission):
    """
    Checks that the first id from the list of users 
    has friends of those who are in the list after him.

    """
    @staticmethod
    def user_friends_queryset(user_id: int):
        """
        Returns a queryset with a list of the user's friends.
        """
        user = User.objects.get(id=user_id)
        friendlist = FriendList.objects.get(user=user)
        return friendlist.friends.values_list('user', flat=True)

    @staticmethod
    def are_friends_in_queryset(friends: list, queryset) -> bool:
        """
        Checks that all friends from the list are in queryset.
        """
        return all(item in queryset for item in friends)

    def has_permission(self, request: HttpRequest, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        if request.method not in SAFE_METHODS:
            queryset = self.user_friends_queryset(request.user.id)

            if queryset is None:
                return False

            friends = json.loads(request.body).get('users', [])[1:]

            if not self.are_friends_in_queryset(friends, queryset):
                raise PermissionDenied(
                    detail=_(
                        "You can't create a chat with a person you don't have in your friends list."
                    ))

            return True

        return True