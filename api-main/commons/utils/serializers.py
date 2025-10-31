from rest_framework import serializers
from commons.authentication.serializer import UserSerializer

class CommonSerializer(serializers.ModelSerializer):
    created_by_detail = UserSerializer(source="created_by", read_only=True)
    updated_by_detail = UserSerializer(source="updated_by", read_only=True)
