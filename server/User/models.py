""" Define Models of User """
# pylint: disable=E1101
# pylint: disable=E0307
# pylint: disable=E0401

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from FriendList.models import FriendList
from sorl.thumbnail import ImageField, get_thumbnail

from .validators import UnicodeUsernameCustomValidator


class User(AbstractUser):
    """ Override of default user model """

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["password", "username"]
    email = models.EmailField(verbose_name=_("email"), unique=True,)

    slug = models.SlugField(verbose_name='URL',
                            unique=True,
                            blank=True,
                            null=True,
                            max_length=150)

    image = ImageField(upload_to="users/profile/image/%d/%m/%Y",
                       verbose_name=_("image"),
                       blank=True)

    username = models.CharField(max_length=150,
                                unique=True,
                                validators=[UnicodeUsernameCustomValidator()],
                                verbose_name=_("username"))

    first_name = models.CharField(_("first name"), max_length=150, blank=True, null=True)
    last_name = models.CharField(_("last name"), max_length=150, blank=True, null=True)

    def __str__(self) -> str:
        return str(self.username)

    @property
    def pictures(self):
        if self.image:
            return [
                get_thumbnail(self.image, '100x100', format="WEBP", quality=70),
                get_thumbnail(self.image, '300x300', format="WEBP", quality=70),
                get_thumbnail(self.image, '600x600', format="WEBP", quality=70),
                get_thumbnail(self.image, '1000x1000', format="WEBP", quality=70),
                get_thumbnail(self.image, "1200x1200", format="WEBP", quality=100),
            ]
        return None

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        abstract = False


@receiver(pre_save, sender=User)
def user_pre_created_handler(instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.username)
    if not instance.image:
        instance.image = "avatar_default.jpg"


@receiver(post_save, sender=User)
def user_created_handler(instance, created, *args, **kwargs):
    if created:
        FriendList.objects.create(user=instance)
