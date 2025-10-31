from commons.utils.permissions import AllowGetOrCustomPermission, AllowPostOrCustomPermission
from commons.utils.filter_utils import fields_lookups
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from django.shortcuts import render
from lookup.serializers import LevelSerializer
from lookup.models import Level
from lookup.serializers import PackageSerializer
from lookup.models import Package
from lookup.serializers import ClassTypeSerializer
from lookup.models import ClassType
from lookup.serializers import ShiftSerializer
from lookup.models import Shift

class LevelListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = LevelSerializer
    queryset = Level.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['name', 'description']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Level)

class LevelDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Level.objects.all()
    serializer_class = LevelSerializer

class PackageListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = PackageSerializer
    queryset = Package.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['name', 'description']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Package)

class PackageDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class ClassTypeListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = ClassTypeSerializer
    queryset = ClassType.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['name', 'description']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(ClassType)

class ClassTypeDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = ClassType.objects.all()
    serializer_class = ClassTypeSerializer

class ShiftListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = ShiftSerializer
    queryset = Shift.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['name', 'description']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Shift)

class ShiftDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer

