from rest_framework import serializers

from commons.multi_languages.serializer import LanguageSerializer
from commons.multi_languages.models import Language
from .models import Media, MediaCategory, MediaSetting
from commons.file.serializers import FileListSerializer
from commons.file.models import File
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from take_the_stage.settings import get_backend_url, MEDIA_ROOT

class MediaCategoryOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaCategory
        fields = '__all__'

class MediaSerializer(serializers.ModelSerializer):
    language_id = serializers.PrimaryKeyRelatedField(queryset=Language.objects.all(), source='language', write_only=True)
    language = LanguageSerializer(read_only=True)
    media_category_id = serializers.PrimaryKeyRelatedField(queryset=MediaCategory.objects.all(), source='media_category', write_only=True)
    media_category = MediaCategoryOnlySerializer(read_only=True)
    file_id = serializers.PrimaryKeyRelatedField(queryset=File.objects.all(), source='file', write_only=True, required=False)
    file = FileListSerializer(read_only=True)
    class Meta:
        model = Media
        fields = '__all__'
        read_only_fields = ['user']

class MediaCategorySerializer(serializers.ModelSerializer):
    parent_id = serializers.PrimaryKeyRelatedField(queryset=MediaCategory.objects.all(), source='parent', required=False, write_only=True)
    language_id = serializers.PrimaryKeyRelatedField(queryset=Language.objects.all(), source='language', write_only=True)
    language = LanguageSerializer(read_only=True)
    parent = MediaCategoryOnlySerializer(read_only=True)
    
    class Meta:
        model = MediaCategory
        fields = '__all__'

class MediaSettingSerializer(serializers.ModelSerializer):
    file_id = serializers.PrimaryKeyRelatedField(queryset=File.objects.all(), source='file', write_only=True, required=False)
    file = FileListSerializer(read_only=True)
    file_url = serializers.SerializerMethodField()

    def get_file_url(self, obj):
        if obj and obj.created_file and obj.created_file.url:
            url = obj.created_file.name
            file_name = url.split('/')[-1]
            encoded_file_name = urlsafe_base64_encode(force_bytes(file_name))
            return  get_backend_url() + 'media/media/' + encoded_file_name
        else:
            raise serializers.ValidationError(('Url does not exist'))
    
    class Meta:
        model = MediaSetting
        fields = '__all__'
