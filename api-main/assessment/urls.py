from django.urls import path
from assessment.views import AttendanceDetailView, AttendanceListCreateView
from assessment.views import ResultDetailView, ResultListCreateView
from assessment.views import TeacherShiftDetailView, TeacherShiftListCreateView
from assessment.views import ApplicationDetailView, ApplicationListCreateView

urlpatterns = [
	path('attendances/<uuid:pk>', AttendanceDetailView.as_view(), name = 'attendance-detail'),
	path('teacher-shifts/<uuid:pk>', TeacherShiftDetailView.as_view(), name = 'teacher-shift-detail'),
	path('results/<uuid:pk>', ResultDetailView.as_view(), name = 'result-detail'),
	path('results',ResultListCreateView.as_view(), name = 'result'),
	path('attendances',AttendanceListCreateView.as_view(), name = 'attendance'),
	path('teacher-shifts',TeacherShiftListCreateView.as_view(), name = 'teacher-shift'),
    path('applications',ApplicationListCreateView.as_view(), name = 'application'),
    path('applications/<uuid:pk>', ApplicationDetailView.as_view(), name = 'application-detail'),
]