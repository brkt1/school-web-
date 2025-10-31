from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType
from commons.utils.model_utils import CommonsModel
from commons.utils.enums import EDUCATIONAL_LEVEL, LanguageType, ActionStatus, GenderType, UserType
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.conf import settings
import uuid

from datetime import date
from django.utils import timezone
from commons.file.models import File
from commons.multi_languages.models import Language

# Create your models here.

User = settings.AUTH_USER_MODEL

class Group(CommonsModel):
    name = models.CharField(_("name"), max_length=150, unique=True)
    group_permissions = models.ManyToManyField(
        ContentType, 
        verbose_name=_("group permission"),
        blank = True,
        related_query_name= "group",
        related_name="group_set",
        through = "GroupPermission"
    )

    @property
    def no_of_users(self):
        return CustomUser.objects.filter(groups=self).count()

    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    def uploadFiles(instance, file_name):
        url = f"profiles/{instance}/{file_name}"
        return url
    id = models.CharField(primary_key=True, unique=True,
                          default=uuid.uuid4, editable=False, max_length=36)
    middle_name = models.CharField(max_length=200 )
    last_name  = models.CharField(max_length=200, blank=True, default="")
    date_of_birth = models.DateField(auto_now=False, null=True,blank=True, auto_now_add=False)
    phone_number = models.CharField(max_length=200)
    lang = models.CharField(choices=LanguageType.choices, blank=True,null=True, max_length=36,default=LanguageType.ENGLISH)
    user_type = models.IntegerField(choices=UserType.choices, blank=True,null=True,default=UserType.STUDENT)
    language = models.ForeignKey(Language, on_delete=models.RESTRICT, null=True, blank=True)
    gender = models.IntegerField(choices=GenderType.choices, null=True)
    # profile_pic = models.URLField(max_length = 200, null=True, blank=True)
    profile_pic = models.FileField(upload_to=uploadFiles, blank=True, null=True)
    bio = models.TextField(max_length=1500, default="")   
    email = models.EmailField(_('email address'), blank=True,  null=True, unique=True)

    user_permissions = models.ManyToManyField(
        ContentType,
        verbose_name=_("user permissions"),
        blank=True,
        help_text=_("Specific permissions for this user."),
        related_name="user_set",
        related_query_name="user",
        through = 'UserPermission',
        through_fields=('user', 'content_type')
    )
    groups = models.ManyToManyField(
        Group,
        verbose_name=_("groups"),
        blank=True, 
        help_text=_(
            "The groups this user belongs to. A user will get all permissions "
            "granted to each of their groups."
        ),
        related_name="user_set",
        related_query_name="user",
        through="CustomUser_Groups",
        through_fields=('customuser', 'group')
    )
    
    class Meta:
        ordering = ('username', 'first_name', 'last_name')

    def __str__(self):
        return self.first_name

    @property
    def group_permission_list(self):
        return GroupPermission.objects.filter(group__user = self).values('group__name',"content_type__model",'can_view','can_change','can_create','can_delete','other_action')
        
    @property
    def user_permission_list(self):
        return UserPermission.objects.filter(user = self).values("content_type__model" ,'can_view','can_change','can_create','can_delete', 'other_action')


    @property
    def name(self):
        return f'{self.first_name} {self.middle_name} {self.last_name}'
    @property
    def short_name(self):
        return f'{self.first_name} {self.middle_name}'
    
class CustomUser_Groups(CommonsModel):
    group = models.ForeignKey(
        Group,
        verbose_name=_("group"),
        related_name="group_user",
        on_delete=models.PROTECT,)
    customuser = models.ForeignKey(
        User,
        verbose_name=_("user"),
        related_name="group_user",
        on_delete=models.PROTECT,)
    
    class Meta:
        unique_together = ("group", "customuser")
    
    def __str__(self):
        return self.group.name + " " + self.user.username

class UserPermission(CommonsModel):
    user = models.ForeignKey(User, verbose_name=_("user"),related_name="user_permission", on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, verbose_name=_("content type"), on_delete=models.CASCADE)
    can_view = models.BooleanField(default= False, verbose_name=_("can_views"))
    can_change = models.BooleanField(default= False)
    can_delete = models.BooleanField(default= False)
    can_create = models.BooleanField(default= False)
    other_action = models.BooleanField(default=False)
    
    def __str__(self):
        return self.user.first_name + " " + self.content_type.model

class GroupPermission(CommonsModel):
    group = models.ForeignKey(Group, verbose_name=_("group"),related_name="group_permission", on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, verbose_name=_("content type"), on_delete=models.CASCADE)
    can_view = models.BooleanField(default= False)
    can_change = models.BooleanField(default= False)
    can_delete = models.BooleanField(default= False)
    can_create = models.BooleanField(default= False)
    other_action = models.BooleanField(default=False)

    def __str__(self):
        return self.group.name + " " + self.content_type.model

class EducationalBackground(CommonsModel):
    user = models.ForeignKey(User, verbose_name=_("user background"), related_name="educational_background", on_delete=models.CASCADE)
    level_of_education = models.IntegerField(_("level of education"), choices=EDUCATIONAL_LEVEL.choices)
    school_of_education = models.CharField(_("school of education"), max_length=200)
    document = models.OneToOneField(File, on_delete=models.CASCADE)
    start_date = models.DateField()
    year_of_graduation = models.DateField(null=True)
    currently_learning = models.BooleanField(default=False)
    
    def __str__(self):
        return self.school_of_education



class Experience(CommonsModel):
    user = models.ForeignKey(User, verbose_name=_("user experience"), related_name="user_experience", on_delete=models.CASCADE)
    job_title = models.CharField(max_length=200)
    company = models.CharField(max_length=800)
    start_date = models.DateField()
    end_date = models.DateField(null=True)
    experience_document = models.OneToOneField(File, on_delete=models.CASCADE)
    currently_working = models.BooleanField(default=False)
    
    def __str__(self):
        return self.job_title


class ToBeInstructorRequest(CommonsModel):
    user = models.ForeignKey(User, verbose_name=_("instructor request"),null=True, related_name="instructor_request", on_delete=models.CASCADE)
    cover_letter = models.TextField(max_length=1500)
    status = models.IntegerField(choices=ActionStatus.choices, blank=True, null=True, default=ActionStatus.SUBMITTED)
    responder = models.ForeignKey(User, verbose_name=_("responder"),blank=True, null=True, related_name="request_responder", on_delete=models.CASCADE)
    request_date = models.DateTimeField(auto_now_add=True)
    response_date = models.DateTimeField(auto_now=True)
    comment = models.TextField(max_length=1500, blank=True, null=True)   


    class Meta:
        ordering = ['-request_date',]

    def __str__(self):
        return self.cover_letter

