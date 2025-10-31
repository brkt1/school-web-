from django.urls import path
from organization.views import DaysByInstitutionAndPackageView, PackageByInstitutionView, RegionDetailView, RegionListCreateView, TimesByInstitutionPackageAndDayView
from organization.views import CityDetailView, CityListCreateView
from organization.views import InstitutionDetailView, InstitutionListCreateView
from organization.views import ClassRoomDetailView, ClassRoomListCreateView
from organization.views import ClassRoomShiftDetailView, ClassRoomShiftListCreateView
from organization.views import TeamMemberDetailView, TeamMemberListCreateView

urlpatterns = [
	path('regions/<uuid:pk>', RegionDetailView.as_view(), name = 'region-detail'),
	path('class-room-shifts',ClassRoomShiftListCreateView.as_view(), name = 'class-room-shift'),
	path('regions',RegionListCreateView.as_view(), name = 'region'),
	path('cities',CityListCreateView.as_view(), name = 'city'),
	path('cities/<uuid:pk>', CityDetailView.as_view(), name = 'city-detail'),
	path('class-room-shifts/<uuid:pk>', ClassRoomShiftDetailView.as_view(), name = 'class-room-shift-detail'),
	path('organization_classes/<uuid:pk>', ClassRoomDetailView.as_view(), name = 'class-detail'),
	path('institutions',InstitutionListCreateView.as_view(), name = 'institution'),
	path('institutions/<uuid:pk>', InstitutionDetailView.as_view(), name = 'institution-detail'),
    path('institutions/<uuid:institution_id>/packages', PackageByInstitutionView.as_view(), name='packages-by-institution'),
    path('institutions/<uuid:institution_id>/packages/<uuid:package_id>/days', DaysByInstitutionAndPackageView.as_view(), name='days-by-institution-package'),
    path('institutions/<uuid:institution_id>/packages/<uuid:package_id>/days/<int:shift_day>/times', TimesByInstitutionPackageAndDayView.as_view(), name='times-by-institution-package-day'),
	path('organization_classes',ClassRoomListCreateView.as_view(), name = 'class'),
    path('team-members',TeamMemberListCreateView.as_view(), name = 'team-member'),
    path('team-members/<uuid:pk>', TeamMemberDetailView.as_view(), name = 'team-member-detail'),
]