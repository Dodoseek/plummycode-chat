""" Configure of User's Application """
from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UserConfig(AppConfig):
    """ Configure of User's Application """

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'User'

    verbose_name = _("User")
