""" Validators for User Application """
from django.core import validators
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext_lazy as _


@deconstructible
class UnicodeUsernameCustomValidator(validators.RegexValidator):
    """ Custom Username Validator """
    regex = r"^[\w-]+\Z"
    message = _(
        "Enter a valid username. This value may contain only letters, "
        "numbers, and '-' or '_' characters."
    )
    flags = 0
