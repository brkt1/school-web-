from django.urls import path
from accounts.views import ApproveTeacherView, AvailableShiftsForStudentView, RejectTeacherView, StudentDetailView, StudentListCreateView, AvailableShiftsForTeacherView
from accounts.views import TeacherDetailView, TeacherListCreateView
from accounts.views import TeacherClassShiftDetailView, TeacherClassShiftListCreateView
from accounts.views import TeacherRequestShiftDetailView, TeacherRequestShiftListCreateView
from accounts.views import StudentRequestShiftDetailView, StudentRequestShiftListCreateView
from accounts.views import StudentClassShiftDetailView, StudentClassShiftListCreateView

urlpatterns = [
	path('student-request-shifts',StudentRequestShiftListCreateView.as_view(), name = 'student-request-shift'),
	path('teachers',TeacherListCreateView.as_view(), name = 'teacher'),
	path('teacher-request-shifts/<uuid:pk>', TeacherRequestShiftDetailView.as_view(), name = 'teacher-request-shift-detail'),
	path('teacher-request-shifts',TeacherRequestShiftListCreateView.as_view(), name = 'teacher-request-shift'),
	path('teachers/<uuid:pk>/reject', RejectTeacherView.as_view(), name='teacher-reject'),
	path('students',StudentListCreateView.as_view(), name = 'student'),
	path('teacher-class-shifts/<uuid:pk>', TeacherClassShiftDetailView.as_view(), name = 'teacher-class-shift-detail'),
	path('teachers/<uuid:pk>/approve', ApproveTeacherView.as_view(), name='teacher-approve'),
	path('teachers/<uuid:teacher_id>/available-shifts', AvailableShiftsForTeacherView.as_view()),
	path('students/<uuid:student_id>/available-shifts', AvailableShiftsForStudentView.as_view()),
	path('teacher-class-shifts',TeacherClassShiftListCreateView.as_view(), name = 'teacher-class-shift'),
	path('student-request-shifts/<uuid:pk>', StudentRequestShiftDetailView.as_view(), name = 'student-request-shift-detail'),
	path('students/<uuid:pk>', StudentDetailView.as_view(), name = 'student-detail'),
	path('teachers/<uuid:pk>', TeacherDetailView.as_view(), name = 'teacher-detail'),
    path('student-class-shifts',StudentClassShiftListCreateView.as_view(), name = 'student-class-shift'),
    path('student-class-shifts/<uuid:pk>', StudentClassShiftDetailView.as_view(), name = 'student-class-shift-detail'),
]