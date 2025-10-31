from django.forms import ValidationError
from requests import Response
from django.http import HttpResponse

from medias.enums import MediaStatus
from .models import Media, MediaCategory, MediaSetting
from .serializers import MediaSerializer, MediaCategorySerializer, MediaSettingSerializer
from rest_framework import generics
from commons.utils.permissions import AllowGetOrCustomPermission, CustomPermission
from rest_framework.filters import OrderingFilter, SearchFilter
from django.db.models import Count
from rest_framework import serializers
import os
from take_the_stage.settings import MEDIA_ROOT
from django.core.files.storage import FileSystemStorage


class MediaListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = MediaSerializer
    queryset = Media.objects.all()
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ['title']
    ordering_fields = ['title', 'language__name', 'media_category__name', 'create_date']
    
    def get_queryset(self):
        language_id = self.request.query_params.get("language_id")
        if language_id is not None:
            self.queryset = self.queryset.filter(language=language_id)
        media_type = self.request.query_params.get("media_type")
        if media_type is not None:
            self.queryset = self.queryset.filter(media_category__media_type=media_type)
        media_category_id = self.request.query_params.get("media_category_id")
        if media_category_id is not None:
            self.queryset = self.queryset.filter(media_category=media_category_id)
        return self.queryset
    
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class MediaDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    
    def patch(self, request, *args, **kwargs):
        methods = {"publish": "publish", "draft": "draft", "archive":"archive"}
        method = self.request.query_params["method"]

        if method not in methods:
            raise ValidationError(("do method not found"))
        if method == methods["publish"]:
            instance = self.get_object()
            media = Media.objects.get(instance.id)
            media.status = MediaStatus.PUBLISHED
            media.save()
            return HttpResponse(media)
        if method == methods["draft"]:
            instance = self.get_object()
            media = Media.objects.get(instance.id)
            media.status = MediaStatus.DRAFT
            media.save()
            return HttpResponse(media)
        if method == methods["archive"]:
            instance = self.get_object()
            media = Media.objects.get(instance.id)
            media.status = MediaStatus.ARCHIVED
            media.save()
            return HttpResponse(media)

class MediaCategoryListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = MediaCategory.objects.all()
    serializer_class = MediaCategorySerializer
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'language__name', 'parent__name', 'order', 'create_date' ]
    
    def get_queryset(self):
        language_id = self.request.query_params.get("language_id")
        if language_id is not None:
            self.queryset = self.queryset.filter(language=language_id)
        parent_id = self.request.query_params.get("parent_id")
        if parent_id is not None:
            self.queryset = self.queryset.filter(parent=parent_id)
        media_type = self.request.query_params.get("media_type")
        if media_type is not None:
            self.queryset = self.queryset.filter(media_type=media_type)
        has_media = self.request.query_params.get("has_media")
        if bool(has_media) == True:
            self.queryset = self.queryset.annotate(num_media=Count('media')).filter(num_media__gt=0)
        return self.queryset

class MediaCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = MediaCategory.objects.all()
    serializer_class = MediaCategorySerializer

class MediaSettingListCreateFileView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = MediaSetting.objects.all()
    serializer_class = MediaSettingSerializer
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ['file__file_name']
    ordering_fields = ['file__file_name']
    
    def get_queryset(self):
        file_id = self.request.query_params.get("file_id")
        if file_id is not None:
            self.queryset = self.queryset.filter(file=file_id)
        image_type = self.request.query_params.get("image_type")
        if image_type is not None:
            self.queryset = self.queryset.filter(image_type=image_type)
        image_subtype = self.request.query_params.get("image_subtype")
        if image_subtype is not None:
            self.queryset = self.queryset.filter(image_subtype=image_subtype)
        return self.queryset

class MediaSettingListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = MediaSetting.objects.all()
    serializer_class = MediaSettingSerializer
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ['file__file_name']
    ordering_fields = ['file__file_name']
    
    def get_queryset(self):
        file_id = self.request.query_params.get("file_id")
        if file_id is not None:
            self.queryset = self.queryset.filter(file=file_id)
        image_type = self.request.query_params.get("image_type")
        if image_type is not None:
            self.queryset = self.queryset.filter(image_type=image_type)
        image_subtype = self.request.query_params.get("image_subtype")
        if image_subtype is not None:
            self.queryset = self.queryset.filter(image_subtype=image_subtype)
        return self.queryset

class MediaSettingDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = MediaSetting.objects.all()
    serializer_class = MediaSettingSerializer

    def perform_update(self, serializer):
        if self.get_object() and self.get_object().created_file and self.get_object().created_file.url:
            file_path = os.path.join(MEDIA_ROOT, 'media/'+self.get_object().created_file.url.split('/')[-1])
            fs = FileSystemStorage()
            if fs.exists(file_path):
                fs.delete(file_path)
        serializer.save()
