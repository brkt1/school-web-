from django.urls import path
from .views import FileCreateListView, FileDetailUpdateView, FolderListCreateView, FolderDetailView

urlpatterns = [
    path("", FileCreateListView.as_view(), name='file_list'),
    path("<uuid:pk>", FileDetailUpdateView.as_view(), name='file_detail'),
    path("folder", FolderListCreateView.as_view(), name='folder_list'),
    path("folder/<uuid:pk>", FolderDetailView.as_view(), name='folder_detail'),
]
