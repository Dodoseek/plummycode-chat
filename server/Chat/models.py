""" Define Models of Chat """
# pylint: disable=E0307
# pylint: disable=E1101


from datetime import datetime

from django.conf import settings
from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from sorl.thumbnail import ImageField

User = settings.AUTH_USER_MODEL


class Message(models.Model):
    """ Message Model """

    class Type(models.TextChoices):
        MESSAGE = 'Message', _('Message')
        ACTION = "Action", _('Action')

    chat = models.ForeignKey('Chat', on_delete=models.CASCADE, related_name='chat', verbose_name=_("Chat"))
    user = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        verbose_name=_("User"),
        null=True,
        blank=True)

    text = models.TextField(verbose_name=_('Text'))
    date = models.DateTimeField(auto_now_add=True, verbose_name=_("Time"))
    type_of = models.CharField(
        max_length=7, choices=Type.choices,
        default=Type.MESSAGE,
        verbose_name=_('Type of message')
    )

    def __str__(self) -> str:
        return str(self.text)

    class Meta:
        verbose_name = _("Message")
        verbose_name_plural = _("Messages")


class Chat(models.Model):
    """ Chat Model """
    users = models.ManyToManyField(User, verbose_name=_('Users'), related_name='users')
    image = ImageField(upload_to='chats/images/%d/%m/%Y',
                       verbose_name=_("Image"), null=True, blank=True)

    name = models.CharField(max_length=100, verbose_name=_('Chat Name'), null=True, blank=True)

    def __str__(self) -> str:
        return str(self.name)

    @property
    def last_message(self):
        return Message.objects.filter(chat=self).latest('date')

    class Meta:
        verbose_name = _("Chat")
        verbose_name_plural = _("Chats")


@receiver(pre_save, sender=Chat)
def chat_pre_created_handler(instance: Chat, *args, **kwargs):
    if not instance.image:
        instance.image = "avatar_default.jpg"
    if not instance.name:
        try:
            last_id = Chat.objects.latest('id').id
        # pylint: disable=W0702
        except:
            last_id = 0
        instance.name = f"Chat #{last_id}"


@receiver(post_save, sender=Chat)
def chat_post_created_handler(instance: Chat, created, *args, **kwargs):
    if created:
        Message.objects.create(
            chat=instance,
            text=_('Chat created'),
            date=datetime.now(),
            type_of="Action")


class ImagesOfMessage(models.Model):
    """ Images-of-message Model """
    image = ImageField(upload_to='chats/messages/images/%d/%m/%Y',
                       verbose_name=_("Image"))

    message = models.ForeignKey(Message, on_delete=models.CASCADE, verbose_name=_("Message"))

    def __str__(self) -> str:
        return str(self.message.text)

    class Meta:
        verbose_name = _("Image")
        verbose_name_plural = _("Images")
