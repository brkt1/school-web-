# commons/apps.py

from django.apps import AppConfig
from django.db.models.signals import pre_save


class CommonsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'commons'

    def ready(self):
        from commons import signals
        from commons.utils.model_utils import CommonsModel
        from django.apps import apps

        if getattr(self, 'signals_connected', False):
            return
        self.signals_connected = True

        for model in apps.get_models():
            if issubclass(model, CommonsModel) and model is not CommonsModel:
                pre_save.connect(
                    signals.set_user_fields_on_save,
                    sender=model,
                    dispatch_uid=f'set_user_fields_on_save_{model.__name__}'
                )
