# validators.py

from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class AlphaNumericPasswordValidator:
    def validate(self, password, user=None):
        if not any(char.isdigit() for char in password) or not any(char.isalpha() for char in password):
            raise ValidationError(
                _("The password must contain a combination of letters and numbers."),
                code='password_no_alpha_numeric',
            )

    def get_help_text(self):
        return _("Your password must contain a combination of letters and numbers.")