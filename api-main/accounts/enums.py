from django.db import models

class StudentType(models.IntegerChoices):
    TRAINING=100
    COMPETITION=101

class TeacherType(models.IntegerChoices):
    TRAINING=100
    COMPETITION=101

class ShiftTimes(models.IntegerChoices):
    MORNING=100
    AFTERNOON=101
    NIGHT=102

class PaymentStatus(models.IntegerChoices):
    COMPLETED=100
    PENDING=101
    REJECTED=102

class ClassLevel(models.IntegerChoices):
    G5_8=100
    G9_10=101
    G11_12=102
    COLLEGE=103
    UNIVERSITY=104
    MASTERS=105

class ShiftDays(models.IntegerChoices):
    SUNDAY=100
    MONDAY=101
    TUESDAY=102
    WEDNESDAY=103
    THURSDAY=104
    FRIDAY=105
    SATURDAY=106

class TeacherRequestStatus(models.IntegerChoices):
    REQUESTED=100
    ACCEPTED=101
    REJECTED=102

class TeacherShiftStatus(models.IntegerChoices):
    ACTIVE=100
    CLOSED=101

class StudentShiftStatus(models.IntegerChoices):
    ACTIVE=100
    CLOSED=101