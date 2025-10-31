from django.db import models

class ShiftDays(models.IntegerChoices):
    SUNDAY=100
    MONDAY=101
    TUESDAY=102
    WEDNESDAY=103
    THURSDAY=104
    FRIDAY=105
    SATURDAY=106

class ShiftTimes(models.IntegerChoices):
    MORNING=100
    AFTERNOON=101
    NIGHT=102

class ApplicationStatus(models.IntegerChoices):
    PENDING=100
    APPROVED=101
    REJECTED=102
