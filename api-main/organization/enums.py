from django.db import models

class InstitutionLevel(models.IntegerChoices):
    G5_8=100
    G9_10=101
    G11_12=102
    COLLEGE=103
    UNIVERSITY=104
    MASTERS=105

class ClassType(models.IntegerChoices):
    TRAINING=100
    COMPETITION=101