from django.db import models
from commons.utils.model_utils import CommonsModel
from lookup.models import Package,Shift
from accounts.enums import ShiftDays
from lookup.models import Level, ClassType
# Create your models here.

class Region(CommonsModel):
    name = models.TextField()

class City(CommonsModel):
    name = models.TextField()
    region = models.ForeignKey(Region, on_delete=models.CASCADE)

class Institution(CommonsModel):
    name = models.TextField()
    level = models.ManyToManyField(Level, blank=True)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    woreda = models.TextField(null=True, blank=True)

class ClassRoom(CommonsModel):
    name= models.TextField()
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    class_type = models.ForeignKey(ClassType, on_delete=models.CASCADE, null=True)

class ClassRoomShift(CommonsModel):
    class_room = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    shift_days = models.IntegerField(choices=ShiftDays.choices)
    shift_times = models.ForeignKey(Shift, on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()
    capacity = models.IntegerField(blank=True, null=True)

class TeamMember(CommonsModel):
    def uploadFiles(instance, file_name):
        url = f"team_member/{instance}/{file_name}"
        return url

    full_name = models.TextField()
    facebook_link = models.TextField(null=True, blank=True)
    twitter_link = models.TextField(null=True, blank=True)
    linkedin_link = models.TextField(null=True, blank=True)
    position = models.TextField()
    description = models.TextField()
    profile = models.FileField(upload_to=uploadFiles, blank=True)

    def __str__(self):
        return self.full_name