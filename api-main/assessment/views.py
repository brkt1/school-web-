from commons.utils.filter_utils import fields_lookups
from commons.utils.permissions import AllowGetOrCustomPermission, AllowPostOrCustomPermission
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from django.shortcuts import render
from assessment.serializers import AttendanceSerializer
from assessment.models import Attendance
from assessment.serializers import ResultSerializer
from assessment.models import Result
from assessment.serializers import TeacherShiftSerializer
from assessment.models import TeacherShift
from assessment.serializers import ApplicationSerializer
from assessment.models import Application

class AttendanceListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = AttendanceSerializer
    queryset = Attendance.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = []
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Attendance)

class AttendanceDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class ResultListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = ResultSerializer
    queryset = Result.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['exam_name']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Result)

class ResultDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

class TeacherShiftListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = TeacherShiftSerializer
    queryset = TeacherShift.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = []
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(TeacherShift)

class TeacherShiftDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = TeacherShift.objects.all()
    serializer_class = TeacherShiftSerializer

class ApplicationListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['application_letter']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Application)

class ApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

