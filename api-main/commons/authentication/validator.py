from rest_framework import serializers
from difflib import SequenceMatcher
from django.contrib.auth.password_validation import validate_password
from django.conf import settings
import os


default_password = os.environ.get('DEFAULT_PASSWORD', '12qwaszxzxasqw12')

def validate_password2(obj,value):
    if value != (obj.context.get('request').data.get('password1') or default_password):
        raise serializers.ValidationError("password fields didn't match.")
    return value
    
def validate_password1(obj, value):
    user_attributes = ("username", "first_name", "last_name", "email")
    data = obj.context.get('request').data
    password  = value.lower()
    for attribute in user_attributes:
        if SequenceMatcher(a=data.get(attribute,"").lower(), b=password).ratio()>0.5:
            raise serializers.ValidationError(f"The password is too similar to the {attribute}.")
    validate_password(password)
    return value


class AlphaNumericPasswordValidator:
    def validate(self, password, user=None):
        if not any(char.isdigit() for char in password) or not any(char.isalpha() for char in password):
            raise ValidationError(
                _("The password must contain a combination of letters and numbers."),
                code='password_no_alpha_numeric',
            )

    def get_help_text(self):
        return _("Your password must contain a combination of letters and numbers.")