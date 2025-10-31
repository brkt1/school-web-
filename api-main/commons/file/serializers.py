from rest_framework import serializers
from rest_framework import generics
from .models import File, Folder
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from take_the_stage.settings import get_backend_url, MEDIA_ROOT

class FolderOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'

class FolderSerializer(serializers.ModelSerializer):
    parent_id = serializers.PrimaryKeyRelatedField(queryset=Folder.objects.all(), source='parent', required=False, write_only=True)
    parent = FolderOnlySerializer(read_only=True)
    
    class Meta:
        model = Folder
        fields = '__all__'
        
class FolderFileSerializer(serializers.Serializer):
    type = serializers.SerializerMethodField()
    data = serializers.SerializerMethodField()

    def get_data(self, obj):
        if isinstance(obj, Folder):
            return FolderSerializer(obj).data
        elif isinstance(obj, File):
            return FileListSerializer(obj).data
        return None
    def get_type(self, obj):
        if isinstance(obj, Folder):
            return "FOLDER"
        elif isinstance(obj, File):
            return "FILE"
        return None
    
    class Meta:
        model = Folder
        fields = '__all__'

class FileListSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    # file_name = serializers.SerializerMethodField()
    # file_size = serializers.SerializerMethodField()
    folder = FolderOnlySerializer(read_only=True)
    folder_id = serializers.PrimaryKeyRelatedField(queryset=Folder.objects.all(), source='folder', required=False, write_only=True)
    
    class Meta:
        model = File
        fields = '__all__'
        extra_kwargs = {
            'url': {'required': False}  # Make the `url` field optional for update
        }

    def get_file_url(self, obj):
        # Check if the file URL exists before proceeding
        if obj and obj.url and obj.url.url:
            url = obj.url.name
            file_name = url.split('/')[-1]
            encoded_file_name = urlsafe_base64_encode(force_bytes(file_name))
            return get_backend_url() + 'media/media/' + encoded_file_name
        return None  # Return None if the URL doesn't exist
    # def get_file_name(self, obj):
    #     return obj and obj.url and obj.url.name.split('/')[-1]
    
    # def get_file_size(self, obj):
    #     if obj and obj.url and obj.url.url:
    #         file_path = os.path.join(MEDIA_ROOT, 'media/'+obj.url.url.split('/')[-1])
    #         return os.path.getsize(file_path) if os.path.exists(file_path) else None 
    #     else:
    #         raise serializers.ValidationError(('Url does not exist'))
            
class FileCreateSerializer(serializers.ModelSerializer):

    folder_id = serializers.PrimaryKeyRelatedField(queryset=Folder.objects.all(), source='folder', write_only=True, required=False)
    class Meta:
        model = File
        fields = '__all__'

