from django.contrib import admin
from sorl.thumbnail.admin import AdminImageMixin

from .models import User


@admin.register(User)
class UserAdminModel(AdminImageMixin, admin.ModelAdmin):
    ''' User Panel in Administartion '''
    pass
