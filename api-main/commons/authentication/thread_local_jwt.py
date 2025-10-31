# commons/authentication/thread_local_jwt.py
from rest_framework_simplejwt.authentication import JWTAuthentication
from commons.utils.user_context import set_current_user

class ThreadLocalJWTAuthentication(JWTAuthentication):
    """
    Custom JWT authentication that stores the authenticated user in thread-local storage.
    """

    def authenticate(self, request):
        result = super().authenticate(request)
        if result is not None:
            user, _ = result
            set_current_user(user)
        return result
