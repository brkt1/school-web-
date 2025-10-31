from django.contrib import admin
from organization.models import Region
from organization.models import City
from organization.models import Institution
from organization.models import ClassRoom
from organization.models import ClassRoomShift
from organization.models import TeamMember


admin.site.register(Region)
admin.site.register(City)
admin.site.register(Institution)
admin.site.register(ClassRoom)
admin.site.register(ClassRoomShift)
admin.site.register(TeamMember)
