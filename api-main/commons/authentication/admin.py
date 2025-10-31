from django.contrib import admin
from .models import CustomUser, EducationalBackground, Group, GroupPermission, UserPermission, ToBeInstructorRequest
from allauth.account.models import EmailConfirmation, EmailAddress


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'first_name',)


class CustomEducationalBackground(admin.ModelAdmin):
    list_display = ('id', 'user', 'level_of_education',
                    'school_of_education', 'document', 'year_of_graduation')


# Register your models here.
admin.site.register(EmailConfirmation)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Group)
admin.site.register(GroupPermission)
admin.site.register(UserPermission)
admin.site.register(EducationalBackground, CustomEducationalBackground)
admin.site.register(ToBeInstructorRequest)

