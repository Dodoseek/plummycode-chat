from django.contrib import admin
from sorl.thumbnail.admin import AdminImageMixin

from .models import Chat, ImagesOfMessage, Message


@admin.register(Chat)
class ChatAdminModel(admin.ModelAdmin):
    pass


@admin.register(Message)
class MessageAdminModel(admin.ModelAdmin):
    pass


@admin.register(ImagesOfMessage)
class ImagesOfMessageAdminModel(AdminImageMixin, admin.ModelAdmin):
    pass
