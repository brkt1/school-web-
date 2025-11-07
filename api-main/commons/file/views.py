from rest_framework import generics
from commons.utils.permissions import CustomPermission, ReadOnly, WriteOnly, PartialUpdateOnly
from .serializers import FileCreateSerializer, FileListSerializer, FolderFileSerializer, FolderSerializer
from .models import File, Folder
from django.shortcuts import render, get_object_or_404
from django.http import FileResponse
from django.core.files.storage import FileSystemStorage
import os
from take_the_stage.settings import get_backend_url, MEDIA_ROOT
from rest_framework import serializers
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response
from rest_framework import status
from itertools import chain

class FileListView(generics.ListAPIView):
    serializer_class = FileListSerializer
    permission_classes = [ReadOnly, WriteOnly, CustomPermission]
    queryset = File.objects.all()
    
    def perform_create(self, serializer):
        data = serializer.validated_data
        serializer.save()
        
class FileCreateListView(generics.ListCreateAPIView):
    permission_classes = [ReadOnly, WriteOnly, CustomPermission]
    queryset = File.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return FileCreateSerializer
        return FileListSerializer
    
    def perform_create(self, serializer):
        data = serializer.validated_data
        serializer.save()
        
class FileDetailUpdateView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [PartialUpdateOnly, ReadOnly, WriteOnly, CustomPermission]
    serializer_class = FileListSerializer
    queryset = File.objects.all()
    
    def perform_update(self, serializer):
        # Get the current file object
        file_instance = self.get_object()
        # Check if file URL exists (you can remove this if not needed for your use case)
        if file_instance.url:
            # Update the file_name and folder (folder_id) fields
            file_name = self.request.data.get('file_name', file_instance.file_name)  # Get file_name from request or keep existing
            folder_id = self.request.data.get('folder_id', file_instance.folder_id)  # Get folder_id from request or keep existing

            # Update the fields on the file instance
            file_instance.file_name = file_name
            file_instance.folder_id = folder_id

            # Save the updated file object without touching other fields
            file_instance.save()

            # Serialize the updated instance
            serializer.save()
        else:
            raise serializers.ValidationError('File URL does not exist')
        
    def perform_destroy(self, instance):
        if instance and instance.url and instance.url.url:
            file_path = os.path.join(MEDIA_ROOT, 'media/'+instance.url.url.split('/')[-1])
            fs = FileSystemStorage()
            if fs.exists(file_path):
                fs.delete(file_path)
                instance.delete()
            else:
                raise serializers.ValidationError(('File doesnot exist'))
        else:
            raise serializers.ValidationError(('Url does not exist'))
            
class FolderListCreateView(generics.ListCreateAPIView):
    permission_classes = [CustomPermission]
    # queryset = Folder.objects.all()
    # serializer_class = FolderSerializer
    # filter_backends = [OrderingFilter, SearchFilter]
    # search_fields = ['folder_name', 'file_name']
    # ordering_fields = ['folder_name', 'created_at']    
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return FolderSerializer
        return FolderFileSerializer
    
    def get_queryset(self):
        parent_id = self.request.query_params.get("parent_id")
        content_type = self.request.query_params.get("content_type")
        search_query = self.request.query_params.get("search", "")
        ordering = self.request.query_params.get("ordering", "folder_name") 

        # Default empty queryset
        folders = Folder.objects.none()
        files = File.objects.none()
        if parent_id is not None:
            if parent_id == "":
                # Root folders and files
                folders = Folder.objects.filter(
                    parent__isnull=True, folder_name__icontains=search_query
                )
                files = File.objects.filter(
                    folder__isnull=True, file_name__icontains=search_query
                )
            else:
                # Folders and files under a specific parent
                folders = Folder.objects.filter(
                    parent=parent_id, folder_name__icontains=search_query
                )
                files = File.objects.filter(
                    folder=parent_id, file_name__icontains=search_query
                )
        else:
            # Optionally, define a default queryset if parent_id is not provided
            folders = Folder.objects.filter(folder_name__icontains=search_query)
        if content_type is not None:
            files = files.filter(content_type=content_type)
        # Combine querysets safely
        combined_queryset = list(chain(folders, files))

        combined_queryset = sorted(
            combined_queryset, 
            key=lambda x: (
                getattr(x, 'file_name', '').lower() if isinstance(x, File) else '',  # For File
                getattr(x, 'folder_name', '').lower() if isinstance(x, Folder) else '',  # For Folder
            )
        )

        return combined_queryset
    
    def create(self, request, *args, **kwargs):
        # Get the folder name and parent ID from the request
        folder_name = request.data.get('folder_name')
        parent_id = request.data.get('parent')

        # Check if the folder already exists
        existing_folder = Folder.objects.filter(folder_name=folder_name, parent_id=parent_id).first()
        if existing_folder:
            # Return the existing folder instead of creating a new one
            serializer = self.get_serializer(existing_folder)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # If the folder does not exist, create it
        return super().create(request, *args, **kwargs)

class FolderDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomPermission]
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer