from django.contrib import admin
from .models import File

# Register your models here.


class CustomFileAdmin(admin.ModelAdmin):
    list_display = ('id', 'file_type', 'url',)


admin.site.register(File,CustomFileAdmin)


