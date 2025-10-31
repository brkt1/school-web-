from django.core.validators import ValidationError
from django.core.validators import BaseValidator


class CustomValidators(BaseValidator):

    def even_integer(value):
        if (value % 2 != 0):
            raise ValidationError(
                ('%(value)s is not even number'), params={'value': value})
