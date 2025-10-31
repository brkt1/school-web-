from django.contrib import admin
from lookup.models import Level
from lookup.models import Package
from lookup.models import ClassType
from lookup.models import Shift


admin.site.register(Level)
admin.site.register(Package)
admin.site.register(ClassType)
admin.site.register(Shift)
