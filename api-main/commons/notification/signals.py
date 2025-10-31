from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from notifications.signals import notify
# from applications.category.models import Category
from commons.authentication.models import CustomUser


# def create_category_notification(sender, instance, created, **kwargs):
#     if created:
#         # Get all the users who should receive the notification (e.g., all staff members)
#         users = CustomUser.objects.filter(is_staff=True)
#         # Create the notification
#         for user in users:
#             notify.send(
#                 sender=instance,
#                 recipient=user,
#                 verb='created',
#                 description=f'A new category named "{instance.category_name}" has been created.',
#             )

