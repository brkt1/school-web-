from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.contenttypes.models import ContentType
from django.db import transaction

from commons.multi_languages.models import Language
from commons.multi_languages.serializer import LanguageSerializer
from .models import CustomUser, CustomUser_Groups, Group, UserPermission, GroupPermission, EducationalBackground,Experience, ToBeInstructorRequest
from .validator import validate_password1, validate_password2, default_password
import json
from ..utils.email_utils import send
from commons.utils.enums import GenderType
from django.core.exceptions import ValidationError as DjangoValidationError
try:
    from allauth.account.adapter import get_adapter
    from allauth.account import app_settings as allauth_settings
    from allauth.utils import email_address_exists
    from allauth.account.models import EmailConfirmation, EmailAddress
    from allauth.account.utils import setup_user_email
except ImportError:
    raise ImportError('allauth needs to be added to INSTALLED_APPS.')
import os
from django.shortcuts import render, get_object_or_404

class ContentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = '__all__'

class GroupUsersSerializer(serializers.ModelSerializer):
    
    group_name = serializers.CharField(
        source="group.name", read_only=True
    )
    user_name = serializers.CharField(
        source="customuser.short_name", read_only=True
    )

    class Meta:
        model = CustomUser_Groups
        fields = ("id", "group", "customuser", "group_name", "user_name")

class GroupSerializerWithOutPermission(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class GroupPermissionSerializer(serializers.ModelSerializer):
    content_type = ContentTypeSerializer(read_only=True)
    group = GroupSerializerWithOutPermission(read_only=True)
    group_id = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), source='group', required=False, write_only=True)
    content_type_id = serializers.PrimaryKeyRelatedField(queryset=ContentType.objects.all(), source='content_type', write_only=True)
    class Meta:
        model = GroupPermission
        fields = '__all__'
        
class GoogleOneTapLoginSerializer(serializers.Serializer):
    credential = serializers.CharField()

class GroupSerializer(serializers.ModelSerializer):
    group_permission = GroupPermissionSerializer(read_only=True, many=True)

    class Meta:
        model = Group
        fields = ['id', 'name', 'group_permission', 'no_of_users']

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=200)
    middle_name = serializers.CharField(max_length=200)
    last_name = serializers.CharField(max_length=200, default="")
    # date_of_birth = serializers.DateField()
    phone_number  =  serializers.CharField(max_length=200)
    gender = serializers.IntegerField()
    # profile_pic = serializers.UUIDField(write_only=True, required=False, allow_null=True)
    is_staff = serializers.BooleanField(default=False)
    is_superuser = serializers.BooleanField(default=False)
    bio = serializers.CharField(max_length=3000, default="")
    password1 = serializers.CharField(write_only=True, default=default_password)
    password2 = serializers.CharField(write_only=True, default=default_password)
    groups = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), many=True, required=False)
    student = serializers.SerializerMethodField()

    def validate_password2(self, value):
        return validate_password2(self, value)

    def validate_password1(self, value):
        return validate_password1(self, value)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                emailAddress = EmailAddress.objects.filter(email=email).first()
                if(emailAddress and emailAddress.verified):
                    raise serializers.ValidationError(
                        ('A user is already registered with this e-mail address. please reset it if you forget your password.'),
                    )
                else:
                    send(self, email)
                    raise serializers.ValidationError(
                        ('A user is already registered with this e-mail address.Check your email for confirmation, you dont have to register again'),
                    )
        return email

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        group,*_ = Group.objects.get_or_create(name="Student")
        user.first_name = self.data.get('first_name')
        user.last_name = self.data.get('last_name', "")
        user.middle_name = self.data.get('middle_name')
        # user.date_of_birth = self.data.get('date_of_birth')
        user.phone_number = self.data.get("phone_number")
        user.profile_pic = self.data.get("profile_pic")
        user.gender = self.data.get('gender')
        user.is_staff = self.data.get("is_staff")
        user.is_superuser = self.data.get("is_superuser")
        group_data = self.data.get("groups")
        if group_data:
            for group_id in group_data:
                data = Group.objects.filter(id=group_id).first()
                user.groups.add(data)
        else:
            user.groups.add(group)
        user.bio = self.data.get('bio')
        user.save()
        return user
    class Meta:
        model = CustomUser
        fields = '__all__'

class CustomUserRegistrationSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=200)
    middle_name = serializers.CharField(max_length=200)
    last_name = serializers.CharField(max_length=200, default="")
    password1 = serializers.CharField(write_only=True, default=default_password)
    password2 = serializers.CharField(write_only=True, default=default_password)
    username = serializers.CharField(read_only=True)

    def validate_password2(self, value):
        return validate_password2(self, value)

    def validate_password1(self, value):
        return validate_password1(self, value)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                emailAddress = EmailAddress.objects.filter(email=email).first()
                if(emailAddress and emailAddress.verified):
                    raise serializers.ValidationError(
                        ('A user is already registered with this e-mail address.'),
                    )
                else:
                    send(self, email)
                    raise serializers.ValidationError(
                        ('A user is already registered with this e-mail address.Check your email for confirmation, you dont have to register again'),
                    )
        return email
    def get_full_name(self, value):
        return value['first_name'] + ' ' + value['middle_name'] + ' ' + value['last_name']

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.first_name = self.data.get('first_name')
        user.last_name = self.data.get('last_name', "")
        user.middle_name = self.data.get('middle_name')
        user.password1 = self.data.get('password1')
        user.password2 = self.data.get('password1')
        user.username = self.data.get('email')
        group,*_ = Group.objects.get_or_create(name="Users")
        user.groups.add(group)
        user.save()
        return user
    class Meta:
        model = CustomUser
        fields = '__all__'

class CustomSignUpRegistrationSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=200)
    middle_name = serializers.CharField(max_length=200)
    last_name = serializers.CharField(max_length=200, default="")
    # date_of_birth = serializers.DateField()
    phone_number  =  serializers.CharField(max_length=200)
    gender = serializers.IntegerField()
    # profile_pic = serializers.UUIDField(write_only=True, required=False, allow_null=True)
    bio = serializers.CharField(max_length=3000, default="")
    password1 = serializers.CharField(write_only=True, default=default_password)
    password2 = serializers.CharField(write_only=True, default=default_password)

    def validate_password2(self, value):
        return validate_password2(self, value)

    def validate_password1(self, value):
        return validate_password1(self, value)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                emailAddress = EmailAddress.objects.filter(email=email).first()
                if(emailAddress and emailAddress.verified):
                    raise serializers.ValidationError(
                        ('A user is already registered with this e-mail address.'),
                    )
                else:
                    send(self, email)
                    raise serializers.ValidationError(
                        ('A user is already registered with this e-mail address.Check your email for confirmation, you dont have to register again'),
                    )
        return email
    def get_full_name(self, value):
        return value['first_name'] + ' ' + value['middle_name'] + ' ' + value['last_name']

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.first_name = self.data.get('first_name')
        user.last_name = self.data.get('last_name', "")
        user.middle_name = self.data.get('middle_name')
        # user.date_of_birth = self.data.get('date_of_birth')
        user.phone_number = self.data.get("phone_number")
        user.profile_pic = self.data.get("profile_pic")
        user.gender = self.data.get('gender')
        user.bio = self.data.get('bio')
        user.password1 = self.data.get('password1')
        user.password2 = self.data.get('password2')
        group,*_ = Group.objects.get_or_create(name="Student")
        user.groups.add(group)
        user.save()
        return user
    class Meta:
        model = CustomUser
        fields = '__all__'

class AdminRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=200)
    middle_name = serializers.CharField(max_length=200)
    last_name = serializers.CharField(max_length=200, default="")
    # date_of_birth = serializers.DateField()

    def validate_password2(self, value):
        return validate_password2(self, value)

    def validate_password1(self, value):
        return validate_password1(self, value)

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.first_name = self.data.get('first_name')
        user.last_name = self.data.get('last_name')
        user.middle_name = self.data.get('middle_name')
        # user.date_of_birth = self.data.get('date_of_birth')
        user.is_superuser = True
        user.save()
        return user
    
    class Meta:
        model = CustomUser
        fields = '__all__'

class UserPermissionAddSerializer(serializers.ModelSerializer):
    content_type = serializers.SlugRelatedField(
        queryset=ContentType.objects.all(),
        slug_field='id'
    )

    class Meta:
        model = UserPermission
        fields = ['id', 'user', 'content_type', 'can_view',
                  'can_change', 'can_create', 'can_delete', 'other_action']

class UserPermissionSerializer(serializers.ModelSerializer):
    content_type = serializers.SlugRelatedField(
        queryset=ContentType.objects.all(),
        slug_field='model'
    )
    user = serializers.SlugRelatedField(
        queryset=CustomUser.objects.all(),
        slug_field='username'
    )

    class Meta:
        model = UserPermission
        fields = ['id', 'user', 'content_type', 'can_view',
                  'can_change', 'can_create', 'can_delete', 'other_action']

class UserAddSerializer(RegisterSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class ContentTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContentType
        fields = '__all__'

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from commons.file.models import File
from take_the_stage.settings import get_backend_url, MEDIA_ROOT

class EducationalBackgroundSerializer(serializers.ModelSerializer):
    document_url = serializers.SerializerMethodField()
    file_name = serializers.SerializerMethodField()
    file_size = serializers.SerializerMethodField()

    class Meta:
        model = EducationalBackground
        fields = ['id','user', 'school_of_education','document', 'level_of_education', 'start_date',
                  'year_of_graduation', 'currently_learning', 'document_url', 'file_name', 'file_size']

    def get_document_url(self, obj):
        document = obj.document.url.url
        file_path = document.rsplit('/', 1)[0]
        file_name = document.split('/')[-1]
        encoded_file_name = urlsafe_base64_encode(force_bytes(file_name))
        return get_backend_url() +'media/media/' + encoded_file_name

    def get_file_name(self, obj):
        file = obj.document.url.url
        return file.split('/')[-1]

    def get_file_size(self, obj):
        file = obj.document.url.url
        file_path = os.path.join(MEDIA_ROOT, 'media/'+file.split('/')[-1])
        return os.path.getsize(file_path) if os.path.exists(file_path) else None

class EducationalBackgroundTutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalBackground
        fields = ['id', 'level_of_education', 'school_of_education', "start_date","year_of_graduation", "currently_learning"]

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class ExperienceTutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id','job_title',"company","start_date", "end_date", "currently_working"]

class ToBeInstructorRequestSerializer(serializers.ModelSerializer):
    profile_pic = serializers.CharField(source="user.profile_pic", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    middle_name = serializers.CharField(source="user.middle_name", read_only=True)
    user_id = serializers.CharField(source="user.id", read_only=True)
    class Meta:
        model = ToBeInstructorRequest
        fields = ('id','user','user_id','profile_pic', "username", "first_name", "middle_name", "cover_letter", "status", "responder", "request_date", "response_date", "comment")

class UserDetailSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=200, required=False, write_only=True)
    # profile = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = "__all__"

    def get_profile(self, obj):
        # print(obj.__dict__.values())
        # return obj.profile_pic.url
        return obj.profile_pic

class UserSerializer(serializers.ModelSerializer):
    user_permission = serializers.SerializerMethodField(read_only=True)
    is_superuser = serializers.BooleanField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    last_login = serializers.DateTimeField(read_only=True)
    date_joined = serializers.DateTimeField(read_only=True)
    full_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ("id", "username", "first_name", "middle_name", "last_name", "email", "language",
                   "profile_pic", "is_superuser", "is_active", "date_of_birth",
                  "last_login", "user_type", "date_joined", "educational_background", 'user_permission', 'groups',"lang", "is_staff", "gender", "phone_number","bio", "full_name",
                  )

    def get_user_permission(self, obj):
        return json.loads(json.dumps(list(obj.user_permission_list))) + (json.loads(json.dumps(list(obj.group_permission_list))))

    def get_full_name(self, value):
        return value.first_name + ' ' + value.middle_name + ' ' + value.last_name
