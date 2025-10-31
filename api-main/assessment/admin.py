from django.contrib import admin
from assessment.models import Attendance
from assessment.models import Result
from assessment.models import TeacherShift
from assessment.models import Application


admin.site.register(Attendance)
admin.site.register(Result)
admin.site.register(TeacherShift)
admin.site.register(Application)
