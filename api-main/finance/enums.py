from django.db import models

class PaymentStatus(models.IntegerChoices):
    PAID=100
    OVERDUE=101
    PENDING=102
    REJECTED=103

class PaymentPurpose(models.IntegerChoices):
    TUITION=100
    APPLICATION=101