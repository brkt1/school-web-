import uuid
from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL

class CommonsModel(models.Model):
    id = models.UUIDField(primary_key=True, unique=True,default=uuid.uuid4, editable=False)
    create_date = models.DateTimeField(auto_now_add = True)
    update_date = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='created_%(class)s_set',
        help_text='The user who created this record.'
    )

    updated_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='updated_%(class)s_set',
        help_text='The user who last updated this record.'
    )

    class Meta:
        abstract = True
        ordering = ['-create_date']