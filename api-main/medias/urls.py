from django.urls import path 
from .views import MediaDetail, MediaListCreateView, MediaCategoryDetail, MediaCategoryListCreateView, MediaSettingDetail, MediaSettingListCreateView

urlpatterns = [
    path('',MediaListCreateView.as_view(), name = 'media-list'),
    path('<uuid:pk>', MediaDetail.as_view(), name = 'media-detail'),
    path('media_category', MediaCategoryListCreateView.as_view(), name="media-category-list"),
    path('media_category/<uuid:pk>', MediaCategoryDetail().as_view(), name = "media-category-detail"),
    path('media_setting', MediaSettingListCreateView.as_view(), name="media-setting-list"),
    path('media_setting/<uuid:pk>', MediaSettingDetail().as_view(), name = "media-setting-detail"),
]

