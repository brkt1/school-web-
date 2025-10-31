from django.forms import ValidationError
from accounts.enums import ShiftDays
from commons.utils.permissions import AllowGetOrCustomPermission, AllowPostOrCustomPermission
from commons.utils.filter_utils import fields_lookups
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from commons.utils.filter_utils import fields_lookups
from commons.utils.permissions import AllowGetOrCustomPermission, AllowPostOrCustomPermission
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from django.shortcuts import render
from organization.serializers import RegionSerializer
from organization.models import Region
from organization.serializers import CitySerializer
from organization.models import City
from organization.serializers import InstitutionSerializer
from organization.models import Institution
from organization.serializers import ClassRoomSerializer
from organization.models import ClassRoom
from organization.serializers import ClassRoomShiftSerializer
from organization.models import ClassRoomShift
from organization.serializers import TeamMemberSerializer, TimeSlotSerializer, ShiftDaysSerializer
from organization.models import TeamMember
from lookup.models import Package
from lookup.serializers import PackageSerializer
from rest_framework.exceptions import NotFound

class RegionListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = RegionSerializer
    queryset = Region.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['name']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Region)

class RegionDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Region.objects.all()
    serializer_class = RegionSerializer

class CityListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = CitySerializer
    queryset = City.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['name']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(City)

class CityDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = City.objects.all()
    serializer_class = CitySerializer

class InstitutionListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = InstitutionSerializer
    queryset = Institution.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['name', 'woreda']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Institution)

class InstitutionDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer

class PackageByInstitutionView(generics.ListAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = PackageSerializer

    def get_queryset(self):
        institution_id = self.kwargs.get('institution_id')
        if not institution_id:
            raise NotFound(detail="Institution ID is required")

        try:
            institution = Institution.objects.get(id=institution_id)
        except Institution.DoesNotExist:
            raise NotFound(detail="Institution not found")

        return Package.objects.filter(
            classroomshift__class_room__institution=institution
        ).distinct()
    

class DaysByInstitutionAndPackageView(generics.ListAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = ShiftDaysSerializer
    def get_queryset(self):
        institution_id = self.kwargs.get('institution_id')
        package_id = self.kwargs.get('package_id')
        if not institution_id or not package_id:
            raise ValidationError("Institution ID and Package ID are required")

        institution = self.get_institution(institution_id)
        package = self.get_package(package_id)

        shift_days_values = (
            ClassRoomShift.objects
            .filter(class_room__institution=institution, package=package)
            .values_list('shift_days', flat=True)
            .distinct()
            .order_by('shift_days')
        )

        days_data = [
            {"value": day_value, "label": ShiftDays(day_value).label}
            for day_value in shift_days_values
        ]

        return days_data

    def get_institution(self, institution_id):
        try:
            return Institution.objects.get(id=institution_id)
        except Institution.DoesNotExist:
            raise NotFound("Institution not found")

    def get_package(self, package_id):
        try:
            return Package.objects.get(id=package_id)
        except Package.DoesNotExist:
            raise NotFound("Package not found")

class TimesByInstitutionPackageAndDayView(generics.ListAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = TimeSlotSerializer

    def get_queryset(self):
        institution_id = self.kwargs.get('institution_id')
        package_id = self.kwargs.get('package_id')
        shift_day = self.kwargs.get('shift_day')

        if not institution_id or not package_id or shift_day is None:
            raise NotFound(detail="Institution ID, Package ID, and Shift Day are required")

        try:
            institution = Institution.objects.get(id=institution_id)
            package = Package.objects.get(id=package_id)
            shift_day = int(shift_day)
        except (Institution.DoesNotExist, Package.DoesNotExist, ValueError):
            raise NotFound(detail="Invalid input or data not found")

        return ClassRoomShift.objects.filter(
            class_room__institution=institution,
            package=package,
            shift_days=shift_day
        ).values('start_time', 'end_time').distinct().order_by('start_time', 'end_time')

class ClassRoomListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = ClassRoomSerializer
    queryset = ClassRoom.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['name']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(ClassRoom)

class ClassRoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = ClassRoom.objects.all()
    serializer_class = ClassRoomSerializer

class ClassRoomShiftListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = ClassRoomShiftSerializer
    queryset = ClassRoomShift.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = []
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(ClassRoomShift)

class ClassRoomShiftDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = ClassRoomShift.objects.all()
    serializer_class = ClassRoomShiftSerializer

class TeamMemberListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = TeamMemberSerializer
    queryset = TeamMember.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['full_name', 'facebook_link', 'twitter_link', 'linkedin_link', 'description']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(TeamMember)

class TeamMemberDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

