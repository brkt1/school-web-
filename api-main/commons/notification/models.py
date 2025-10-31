from django.db import models
# Create your models here.
from notifications.base.models import AbstractNotification
from take_the_stage import settings
from django.contrib.contenttypes.models import ContentType

class Notification(AbstractNotification):
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=False,
        related_name='custom_notifications',
        on_delete=models.CASCADE
    )
    
    actor_content_type = models.ForeignKey(ContentType, related_name='custom_notify_actor', on_delete=models.CASCADE)

    action_object_content_type = models.ForeignKey(
        ContentType, blank=True, null=True,on_delete=models.CASCADE, related_name='custom_notifications'
    )
    target_content_type = models.ForeignKey(
        ContentType,
        related_name='custom_notify_target',
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )
    class Meta(AbstractNotification.Meta):
        abstract = False
