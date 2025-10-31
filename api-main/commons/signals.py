from .utils.user_context import get_current_user

def set_user_fields_on_save(sender, instance, **kwargs):
    user = get_current_user()
    if user and user.is_authenticated:
        if hasattr(instance, 'updated_by_id'):
            instance.updated_by = user
        if not instance.created_by_id and hasattr(instance, 'created_by_id'):
            instance.created_by = user