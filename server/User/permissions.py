""" Permissions for User Model """
from django.http import HttpRequest
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission


class IsOwnerOrAdmin(BasePermission):
    """
    If an object is requested by its 
    owner or administrator, it returns True,
    otherwise it returns False

    """

    def has_object_permission(self, request: HttpRequest, view, obj):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        if obj == request.user or request.user.is_superuser:
            return True
        raise PermissionDenied(
            detail=_("You can't request information about someone other than yourself"))
