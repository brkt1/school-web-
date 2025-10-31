import uuid
from django.db import models

# Create your models here.
class AboutUs(models.Model):
    def uploadFiles(instance, file_name):
        url = f"about_us/{instance}/{file_name}"
        return url
    id = models.CharField(primary_key=True, unique=True,
                          default=uuid.uuid4, editable=False, max_length=36)
    company_logo = models.FileField(upload_to=uploadFiles, blank=True)
    description = models.CharField(max_length=50)
    address = models.TextField(max_length=500)
    phone_number = models.CharField(max_length=12)
    telephone = models.CharField(max_length=12)
    linked_in = models.URLField()
    telegram = models.URLField()
    youtube = models.URLField()
    facebook = models.URLField()

