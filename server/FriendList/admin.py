from django.contrib import admin

from .models import FriendList, FriendRequest


@admin.register(FriendList)
class FriendListAdminModel(admin.ModelAdmin):
    ''' User Panel in Administartion '''
    save_on_top = True


@admin.register(FriendRequest)
class FriendRequestAdminModel(admin.ModelAdmin):
    ''' User Panel in Administartion '''
    save_on_top = True
