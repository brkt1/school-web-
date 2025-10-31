from django.apps import apps
from django.db import transaction

def get_next_serial_number():
    Subject = apps.get_model('tutor', 'Subject')  # Dynamically get the Subject model
    with transaction.atomic():
        last_entry = Subject.objects.select_for_update().order_by('serial_number').last()
        if not last_entry:
            return 1
        return last_entry.serial_number + 1