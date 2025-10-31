from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Student, Teacher
from accounts.models import TeacherClassShift
from accounts.models import TeacherRequestShift
from accounts.models import StudentRequestShift
from accounts.models import StudentClassShift


admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(TeacherClassShift)
admin.site.register(TeacherRequestShift)
admin.site.register(StudentRequestShift)
admin.site.register(StudentClassShift)
