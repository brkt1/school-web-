from rest_framework import serializers
from accounts.serializers import StudentSerializer, TeacherSerializer
from organization.serializers import ClassRoomSerializer, InstitutionSerializer
from assessment.models import Attendance
from assessment.models import Result
from assessment.models import TeacherShift
from assessment.models import Application

class AttendanceSerializer(serializers.ModelSerializer):
    student_detail = StudentSerializer(source='student', read_only=True)

    class Meta:
        model = Attendance
        fields = '__all__'

class ResultSerializer(serializers.ModelSerializer):
    student_detail = StudentSerializer(source='student', read_only=True)

    class Meta:
        model = Result
        fields = '__all__'

class TeacherShiftSerializer(serializers.ModelSerializer):
    teacher_detail = TeacherSerializer(source='teacher', read_only=True)
    class_room_detail = ClassRoomSerializer(source='class_room', read_only=True)

    class Meta:
        model = TeacherShift
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    teacher_detail = TeacherSerializer(source='teacher', read_only=True)
    institution_detail = InstitutionSerializer(source='institution', read_only=True)

    class Meta:
        model = Application
        fields = '__all__'

