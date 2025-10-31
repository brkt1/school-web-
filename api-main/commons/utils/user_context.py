# commons/utils/user_context.py
import threading

_thread_local = threading.local()

def get_current_user():
    user = getattr(_thread_local, 'user', None)
    if user and hasattr(user, 'is_authenticated'):
        if callable(user.is_authenticated):
            return user if user.is_authenticated() else None
        return user if user.is_authenticated else None
    return None

def set_current_user(user):
    _thread_local.user = user

def clear_current_user():
    if hasattr(_thread_local, 'user'):
        del _thread_local.user
