from django_filters import rest_framework as filters

from commons.utils.filter_utils import safe_all_lookups
from .models import CustomUser

class CustomUserFilter(filters.FilterSet):
    class Meta:
        model = CustomUser
        fields = {
            'middle_name': safe_all_lookups(CustomUser, 'middle_name'),
            'last_name': safe_all_lookups(CustomUser, 'last_name'),
            'user_type': safe_all_lookups(CustomUser, 'user_type')
        }