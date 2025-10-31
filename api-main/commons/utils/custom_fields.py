from django.db import models
from django.utils.translation import gettext_lazy as _
from commons.utils.custom_validators import CustomValidators


class JsonField(models.Field):
    description = _("Json string (up to %(max_length)s)")

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)


class EvenIntegerField(models.IntegerField):
    def __init__(self, *args, **kwargs) -> None:
        # print("self:", dir(self))
        # print("args:", args)
        # print("kwargs:", kwargs)
        super().__init__(*args, **kwargs)
        super().validators.append(CustomValidators.even_integer)
