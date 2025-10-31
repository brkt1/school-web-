from django.urls import path
from lookup.views import LevelDetailView, LevelListCreateView
from lookup.views import PackageDetailView, PackageListCreateView
from lookup.views import ClassTypeDetailView, ClassTypeListCreateView
from lookup.views import ShiftDetailView, ShiftListCreateView

urlpatterns = [
	path('levels/<uuid:pk>', LevelDetailView.as_view(), name = 'level-detail'),
	path('levels',LevelListCreateView.as_view(), name = 'level'),
	path('packages',PackageListCreateView.as_view(), name = 'package'),
	path('class-types/<uuid:pk>', ClassTypeDetailView.as_view(), name = 'class-type-detail'),
	path('packages/<uuid:pk>', PackageDetailView.as_view(), name = 'package-detail'),
	path('class-types',ClassTypeListCreateView.as_view(), name = 'class-type'),
    path('shifts',ShiftListCreateView.as_view(), name = 'shift'),
    path('shifts/<uuid:pk>', ShiftDetailView.as_view(), name = 'shift-detail'),
]