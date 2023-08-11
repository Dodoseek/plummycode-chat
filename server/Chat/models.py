""" Define Models of Chat """
# pylint: disable=E0307
# pylint: disable=E1101


from django.conf import settings
from django.db import models
# from django.db.models.signals import pre_save
# from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from sorl.thumbnail import ImageField, get_thumbnail

User = settings.AUTH_USER_MODEL


class Chat(models.Model):
    """ Chat Model """
    users = models.ManyToManyField(User, verbose_name=_('Users'), related_name='users')

    def __str__(self) -> str:
        return str(self.id)

    class Meta:
        verbose_name = _("Chat")
        verbose_name_plural = _("Chats")


# @receiver(pre_save, sender=Chat)
# def chat_pre_created_handler(instance: Chat, *args, **kwargs):
#     if not instance.image:
#         instance.image = "avatar_default.jpg"


class Message(models.Model):
    """ Message Model """
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, verbose_name=_("Chat"))
    user = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name=_("User"))
    text = models.TextField(verbose_name=_('Text'))
    date = models.DateTimeField(auto_now_add=True, verbose_name=_("Time"))

    def __str__(self) -> str:
        return str(self.text)

    class Meta:
        verbose_name = _("Message")
        verbose_name_plural = _("Messages")


class ImagesOfMessage(models.Model):
    """ Images-of-message Model """
    image = ImageField(upload_to='chats/messages/images/%d/%m/%Y',
                       verbose_name=_("Image"))

    message = models.ForeignKey(Message, on_delete=models.CASCADE, verbose_name=_("Message"))

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

    def __str__(self) -> str:
        return str(self.message.text)

    class Meta:
        verbose_name = _("Image")
        verbose_name_plural = _("Images")
