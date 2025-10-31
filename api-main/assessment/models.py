from django.db import models
from commons.utils.model_utils import CommonsModel
from accounts.models import Student, Teacher
from .enums import ShiftDays, ShiftTimes, ApplicationStatus
from organization.models import ClassRoom, Institution

# Create your models here.

class Attendance(CommonsModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    present = models.BooleanField()
    date = models.DateTimeField()

class Result(CommonsModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    exam_name = models.TextField()
    score = models.DecimalField(decimal_places=2, max_digits=4)
    date = models.DateTimeField()

class TeacherShift(CommonsModel):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    day = models.IntegerField(choices=ShiftDays.choices)
    shift = models.IntegerField(choices=ShiftTimes.choices)
    class_room = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)

class Application(CommonsModel):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    status = models.IntegerField(choices=ApplicationStatus.choices)
    submission_date = models.DateTimeField(auto_now=True)
    application_letter = models.TextField()
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    shift = models.IntegerField(choices=ShiftTimes.choices)
