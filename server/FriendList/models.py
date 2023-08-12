# pylint: disable=E1101

from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import PermissionDenied

User = settings.AUTH_USER_MODEL


class FriendList(models.Model):
    """ Friends of User List Model """
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                verbose_name=_('user'),
                                related_name='user'
                                )

    friends = models.ManyToManyField(User,
                                     blank=True,
                                     related_name='friends',
                                     verbose_name=_("friends")
                                     )

    def __str__(self) -> str:
        return str(self.user.username)

    def add_friend(self, account: User):
        """
        Add a new friend
        """
        if not account in self.friends.all():
            self.friends.add(account)
        else:
            raise PermissionDenied(
                detail="This user is already on your friends list"
            )

    def remove_friend(self, account):
        """ Remove a friend """
        if account in self.friends.all():
            self.friends.remove(account)
        else:
            raise PermissionDenied(
                detail="This user is not in your friends list"
            )

    class Meta:
        verbose_name = _("List of friends")
        verbose_name_plural = _("Friend Lists")


class FriendRequest(models.Model):
    """ Requset to add in FriendList Model """
    sender = models.ForeignKey(User,
                               on_delete=models.CASCADE,
                               related_name='sender',
                               verbose_name=_("sender"))

    receiver = models.ForeignKey(User,
                                 on_delete=models.CASCADE,
                                 related_name='receiver',
                                 verbose_name=_("receiver"))

    is_active = models.BooleanField(verbose_name=_('active?'), default=True)
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name=_("date"))

    def __str__(self) -> str:
        return str(self.sender.username)

    def accept(self):
        """ The receiver accepted the request  """
        receiver_list: FriendList = FriendList.objects.get(user=self.receiver)
        sender_list: FriendList = FriendList.objects.get(user=self.sender)

        receiver_list.add_friend(self.sender)
        sender_list.add_friend(self.receiver)

        receiver_list.save()
        sender_list.save()

        self.is_active = False
        self.save()

    def reject(self):
        """ The receiver rejected the request  """
        self.delete()

    class Meta:
        verbose_name = _("Friendship Request")
        verbose_name_plural = _("Friendship Requests")
