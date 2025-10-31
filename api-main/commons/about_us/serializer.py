from commons.about_us.models import AboutUs
from rest_framework import serializers


class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = ['id', 'company_logo', 'description', 'address', 'phone_number',
                  'telephone', 'linked_in', 'telegram', 'youtube', 'facebook']
