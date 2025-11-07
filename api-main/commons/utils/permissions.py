from rest_framework import permissions, serializers
from commons.authentication.models import UserPermission, GroupPermission                                        
class CustomPermission(permissions.BasePermission):
    perms_map = {
        'GET': 'can_view',
        'OPTIONS': [],
        'HEAD': [],
        'POST': 'can_create',
        'PUT': 'can_change',
        'PATCH': 'other_action',
        'DELETE': 'can_delete',
    }

    def _user_permissions(self,permissions_filter):
        users_permission = UserPermission.objects.filter( **permissions_filter)
        return users_permission.exists()

    def _group_permision(self, permissions_filter):
        permissions_filter["group__user"] = permissions_filter.pop("user")
        group_permission = GroupPermission.objects.filter(**permissions_filter)
        return group_permission.exists()


    def _permission_query(self,request_param,user,model_name):
        permissions_filter = {
            "user": user,
            request_param: True,
            'content_type__model':model_name
        }
        if self._user_permissions(permissions_filter) or self._group_permision(permissions_filter):
            return True
        return False
    def _check_permission(self, request_param,model, user):
        model_name = model._meta.model_name
        if isinstance(request_param, str):
            return self._permission_query(request_param, user, model_name)
        elif isinstance(request_param, list):
            if len(request_param) == 0:
                return True
            for param in request_param:
                if self._check_permission(param, model, user):
                    return True
        return False

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        if user.is_superuser:
            return True
        if request.method not in self.perms_map:
            raise serializers.ValidationError("The method is not allowed")
        request_param = self.perms_map[request.method]
        model = None
        if hasattr(view,"permission_model"):
            model = view.permission_model
        elif hasattr(view, 'get_serializer_class'):
            serializer_class = view.get_serializer_class()
            if serializer_class and hasattr(serializer_class, 'Meta'):
                model = serializer_class.Meta.model
        assert model is not None, (
                '{}.permission_model and {}.serializer_class returned None'.format(view.__class__.__name__,view.__class__.__name__)
        )
        return self._check_permission(request_param, model, user)



class IsSystemAdminUser(permissions.BasePermission):
    
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_superuser)

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

class WriteOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return request.method == "POST" 
        return True

class PartialUpdateOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method == "PATCH" 

class AllowGetOrCustomPermission(permissions.BasePermission):
    """
    Custom permission to allow view access (GET requests) for all users,
    and defer other permission checks to CustomPermission.
    """

    def has_permission(self, request, view):
        # Allow all users to perform GET requests
        if request.method == 'GET':
            return True
        # Defer to CustomPermission for other methods
        custom_permission = CustomPermission()
        return custom_permission.has_permission(request, view)

class AllowPutOrCustomPermission(permissions.BasePermission):
    """
    Custom permission to allow view access (PUT requests) for all users,
    and defer other permission checks to CustomPermission.
    """

    def has_permission(self, request, view):
        # Allow all users to perform PUT requests
        if request.method == 'PUT':
            return True
        # Defer to CustomPermission for other methods
        custom_permission = CustomPermission()
        return custom_permission.has_permission(request, view)
    
class AllowGetPutOrCustomPermission(permissions.BasePermission):
    """
    Custom permission to allow view access (PUT requests) for all users,
    and defer other permission checks to CustomPermission.
    """

    def has_permission(self, request, view):
        # Allow all users to perform PUT requests
        if request.method == 'PUT':
            return True
        if request.method == 'GET':
            return True
        # Defer to CustomPermission for other methods
        custom_permission = CustomPermission()
        return custom_permission.has_permission(request, view)
    
class AllowPostOrCustomPermission(permissions.BasePermission):
    """
    Custom permission to allow view access (POST requests) for all users,
    and defer other permission checks to CustomPermission.
    """

    def has_permission(self, request, view):
        # Allow all users to perform GET requests
        if request.method == 'POST':
            return True
        # Defer to CustomPermission for other methods
        custom_permission = CustomPermission()
        return custom_permission.has_permission(request, view)
    
class AllowGetPostOrCustomPermission(permissions.BasePermission):
    """
    Custom permission to allow view access (POST requests) for all users,
    and defer other permission checks to CustomPermission.
    """

    def has_permission(self, request, view):
        # Allow all users to perform GET requests
        if request.method == 'POST':
            return True
        if request.method == 'GET':
            return True
        # Defer to CustomPermission for other methods
        custom_permission = CustomPermission()
        return custom_permission.has_permission(request, view)