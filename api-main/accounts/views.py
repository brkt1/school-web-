from commons.utils.permissions import AllowGetOrCustomPermission, AllowPostOrCustomPermission
from commons.utils.filter_utils import fields_lookups
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
import json
from commons.utils.permissions import AllowGetOrCustomPermission, AllowGetPostOrCustomPermission, AllowPostOrCustomPermission
from commons.utils.filter_utils import fields_lookups
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from commons.utils.filter_utils import fields_lookups
from commons.utils.permissions import AllowGetOrCustomPermission, AllowPostOrCustomPermission
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from django.shortcuts import render
from accounts.serializers import StudentSerializer
from accounts.models import Student
from accounts.serializers import TeacherSerializer
from accounts.models import Teacher
from rest_framework.parsers import MultiPartParser, FormParser
from accounts.serializers import TeacherClassShiftSerializer
from accounts.models import TeacherClassShift
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .enums import StudentShiftStatus, TeacherRequestStatus, TeacherShiftStatus
from accounts.serializers import TeacherRequestShiftSerializer
from accounts.models import TeacherRequestShift
from organization.serializers import ClassRoomShiftSerializer,ClassRoomShift
from accounts.serializers import StudentRequestShiftSerializer
from accounts.models import StudentRequestShift
from commons.utils.email_utils import get_teacher_rejection_email, get_teacher_approval_email, send_email_to_user
from django.utils import timezone
from accounts.serializers import StudentClassShiftSerializer
from accounts.models import StudentClassShift

class StudentListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetPostOrCustomPermission]
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['grade', 'woreda', 'parents_phonenumber','user__first_name', 'user__last_name', 'user__middle_name']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Student)

class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class TeacherListCreateView(generics.ListCreateAPIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowGetPostOrCustomPermission]
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['woreda', 'user__first_name', 'user__last_name', 'user__middle_name','user__email', 'user__phone_number']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Teacher)

    def create(self, request, *args, **kwargs):
        data = self.flatten_request_data(request)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def flatten_request_data(self,request):
        data = request.data.copy()

        # Special handling for nested JSON fields
        teacher_shifts = data.get('teacher_request_shifts')
        if isinstance(teacher_shifts, list) and len(teacher_shifts) == 1:
            teacher_shifts = teacher_shifts[0]
        try:
            data['teacher_request_shifts'] = json.loads(teacher_shifts)
        except (TypeError, json.JSONDecodeError):
            data['teacher_request_shifts'] = []

        # Now flatten all other fields
        flattened_data = {}
        for key, value in data.items():
            if key == 'teacher_request_shifts':
                flattened_data[key] = data['teacher_request_shifts']
            else:
                flattened_data[key] = value[0] if isinstance(value, list) else value

        return flattened_data

class AvailableShiftsForTeacherView(generics.ListAPIView):
    serializer_class = ClassRoomShiftSerializer

    def get_queryset(self):
        teacher_id = self.kwargs.get('teacher_id')

        # Get teacher's request shift
        try:
            request_shifts = TeacherRequestShift.objects.filter(teacher__id=teacher_id)
        except TeacherRequestShift.DoesNotExist:
            return ClassRoomShift.objects.none()

        matching_shifts = ClassRoomShift.objects.none()

        for rs in request_shifts:
            qs = ClassRoomShift.objects.filter(
                class_room__institution=rs.institution,
                shift_days=rs.shift_days,
                start_time=rs.start_time,
                end_time=rs.end_time,
            )
            matching_shifts = matching_shifts | qs

        matching_shifts = matching_shifts.distinct()


        occupied_ids = TeacherClassShift.objects.filter(
            class_room_shift__in=matching_shifts,
            status=TeacherShiftStatus.ACTIVE
        ).values_list('class_room_shift_id', flat=True)

        return matching_shifts.exclude(id__in=occupied_ids)
    
class AvailableShiftsForStudentView(generics.ListAPIView):
    serializer_class = ClassRoomShiftSerializer

    def get_queryset(self):
        student_id = self.kwargs.get('student_id')

        try:
            request_shifts = StudentRequestShift.objects.filter(student__id=student_id)
        except StudentRequestShift.DoesNotExist:
            return ClassRoomShift.objects.none()

        matching_shifts = ClassRoomShift.objects.none()

        for rs in request_shifts:
            qs = ClassRoomShift.objects.filter(
                class_room__institution=rs.institution,
                shift_days=rs.shift_days,
                start_time=rs.start_time,
                end_time=rs.end_time,
            )
            matching_shifts = matching_shifts | qs

        matching_shifts = matching_shifts.distinct()


        occupied_ids = StudentClassShift.objects.filter(
            class_room_shift__in=matching_shifts,
            status=StudentShiftStatus.ACTIVE
        ).values_list('class_room_shift_id', flat=True)

        return matching_shifts.exclude(id__in=occupied_ids)

class TeacherDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class TeacherClassShiftListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = TeacherClassShiftSerializer
    queryset = TeacherClassShift.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = []
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(TeacherClassShift)

class ApproveTeacherView(APIView):
    permission_classes = [permissions.IsAdminUser]  # Only admins can approve

    def post(self, request, pk):
        try:
            teacher = Teacher.objects.get(pk=pk)
            teacher.request_status = TeacherRequestStatus.ACCEPTED
            teacher.response_date = timezone.now()
            teacher.response_by = request.user
            teacher.save()

            if teacher.user:
                subject, text, html = get_teacher_approval_email(teacher.user)
                send_email_to_user(teacher.user, subject, text, html)

            return Response({'status': 'approved'}, status=200)

        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher not found'}, status=404)

class RejectTeacherView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):
        try:
            teacher = Teacher.objects.get(pk=pk)
            user = teacher.user

            teacher.request_status = TeacherRequestStatus.REJECTED
            teacher.response_date = timezone.now()
            teacher.response_by = request.user
            teacher.user = None
            teacher.save()

            if user:
                subject, text, html = get_teacher_rejection_email(user)
                send_email_to_user(user, subject, text, html)
                user.delete()
            teacher.delete()

            return Response({'status': 'rejected and user deleted'}, status=200)

        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher not found'}, status=404)

class TeacherClassShiftDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = TeacherClassShift.objects.all()
    serializer_class = TeacherClassShiftSerializer

class TeacherRequestShiftListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = TeacherRequestShiftSerializer
    queryset = TeacherRequestShift.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = []
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(TeacherRequestShift)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

class TeacherRequestShiftDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = TeacherRequestShift.objects.all()
    serializer_class = TeacherRequestShiftSerializer

class StudentRequestShiftListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = StudentRequestShiftSerializer
    queryset = StudentRequestShift.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = []
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(StudentRequestShift)

class StudentRequestShiftDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = StudentRequestShift.objects.all()
    serializer_class = StudentRequestShiftSerializer

class StudentClassShiftListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = StudentClassShiftSerializer
    queryset = StudentClassShift.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = []
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(StudentClassShift)

class StudentClassShiftDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = StudentRequestShiftSerializer
    queryset = StudentRequestShift.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = []
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(StudentRequestShift)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

