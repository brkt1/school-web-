from rest_framework import serializers
from commons.utils.serializers import CommonSerializer
from decimal import Decimal
from rest_framework import serializers
from take_the_stage.settings import get_frontend_url
from commons.utils.serializers import CommonSerializer
from rest_framework import serializers
from lookup.serializers import LevelSerializer, PackageSerializer, ShiftSerializer
from commons.utils.serializers import CommonSerializer
from rest_framework import serializers
from accounts.enums import TeacherRequestStatus
from commons.utils.chapa_payment import acceptPayment
from commons.utils.email_utils import send_email_confirm_password_reset_link, send_password_reset_link
from commons.authentication.models import CustomUser
from commons.utils.enums import UserType
from commons.authentication.serializer import UserSerializer
from organization.serializers import CitySerializer, ClassRoomSerializer, ClassRoomShiftSerializer, InstitutionSerializer, RegionSerializer
from django.contrib.auth.password_validation import validate_password
from accounts.models import PaymentShiftDetail, Student
from accounts.models import Teacher
from django.db import transaction
from accounts.models import TeacherClassShift
from finance.enums import PaymentPurpose
from accounts.models import TeacherRequestShift
from accounts.models import StudentRequestShift
from finance.models import FeePackage
from finance.serializers import PaymentSerializer
from accounts.models import StudentClassShift

class StudentRequestShiftWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentRequestShift
        exclude = ['student']

class StudentSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    username = serializers.CharField(write_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    gender = serializers.CharField(write_only=True)
    phone_number = serializers.CharField(write_only=True)
    middle_name = serializers.CharField(write_only=True)
    user_detail = UserSerializer(source='user', read_only=True)
    user = UserSerializer(read_only=True)
    region_detail = RegionSerializer(source='region', read_only=True)
    city_detail = CitySerializer(source='city', read_only=True)
    institution_detail = InstitutionSerializer(source='institution', read_only=True)
    class_room_1_detail = ClassRoomSerializer(source='class_room_1', read_only=True)
    class_room_2_detail = ClassRoomSerializer(source='class_room_2', read_only=True)
    student_request_shifts = StudentRequestShiftWriteSerializer(many=True, write_only=True, required=True)
    checkout_url = serializers.SerializerMethodField(read_only=True)

    def get_checkout_url(self, obj):
        return getattr(obj, '_checkout_url', None)

    class Meta:
        model = Student
        fields = '__all__'

    def create(self, validated_data):
        # Pop user fields
        email = validated_data.pop('email')
        username = validated_data.pop('username')
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        middle_name = validated_data.pop('middle_name')
        gender = validated_data.pop('gender')
        phone_number = validated_data.pop('phone_number')
        shift_data = validated_data.pop('student_request_shifts')

        with transaction.atomic():
            user = CustomUser.objects.create_user(
                email=email,
                username=username,
                first_name=first_name,
                last_name=last_name,
                middle_name=middle_name,
                user_type=UserType.STUDENT,
                gender=gender,
                phone_number=phone_number
            )

            student = Student.objects.create(user=user, **validated_data)

            created_shifts = []
            total_fee = Decimal('0.00')

            for shift in shift_data:
                student_shift = StudentRequestShift.objects.create(student=student, **shift)
                created_shifts.append(student_shift)

                fee_package = FeePackage.objects.filter(package=student_shift.fee_package).first()
                if not fee_package or not fee_package.fee:
                    raise serializers.ValidationError(
                        f"No valid FeePackage found for package {student_shift.fee_package.name}"
                    )

                total_fee += fee_package.fee

            if total_fee > 0:
                payment_data = acceptPayment(
                    user,
                    total_fee,
                    "Tution Payment",
                    "Payment of Tution for selected shifts",
                    get_frontend_url(),
                    PaymentPurpose.TUITION,
                    None,
                    None,
                    student.tin_no,
                    student.vat_reg_no,
                    student.vat_reg_date,
                    f'{student.region.name},{student.city.name}'
                )

                payment_response = payment_data.get("response")
                payment = payment_data.get("payment")

                if payment_response.get("status") == "success":
                    student._checkout_url = payment_response.get("data", {}).get(
                        "checkout_url"
                    )
                    student.tuition_fee = payment
                    student.save()

                    for shift in created_shifts:
                        fee_package = FeePackage.objects.filter(package=shift.fee_package).first()
                        PaymentShiftDetail.objects.create(
                            payment=payment,
                            student_shift=shift,
                            fee_package=fee_package,
                            amount=fee_package.fee
                        )
                else:
                    print(payment_response)
            # send_password_reset_link(email)
        return student

    def update(self, instance, validated_data):
        user = instance.user
        user_fields = ['email', 'username', 'first_name', 'last_name', 'middle_name', 'gender', 'phone_number']
        for field in user_fields:
            if field in validated_data:
                setattr(user, field, validated_data.pop(field))
        user.set_unusable_password()
        user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class TeacherRequestShiftWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherRequestShift
        exclude = ['teacher']

class TeacherSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    username = serializers.CharField(write_only=True)
    first_name = serializers.CharField(write_only=True)
    gender = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    phone_number = serializers.CharField(write_only=True)
    middle_name = serializers.CharField(write_only=True)
    user_detail = UserSerializer(source='user', read_only=True)
    institution_detail = InstitutionSerializer(source='institution', read_only=True)
    level_of_teaching_detail = LevelSerializer(source='level_of_teaching', read_only=True)
    region_detail = RegionSerializer(source='region', read_only=True)
    city_detail = CitySerializer(source='city', read_only=True)
    user = UserSerializer(read_only=True)
    teacher_request_shifts = TeacherRequestShiftWriteSerializer(many=True, write_only=True, required=True)
    checkout_url = serializers.SerializerMethodField(read_only=True)
    application_fee_detail = PaymentSerializer(source='application_fee', read_only=True)

    class Meta:
        model = Teacher
        fields = '__all__'

    def get_checkout_url(self, obj):
        return getattr(obj, '_checkout_url', None)

    def create(self, validated_data):
        # Pop user fields
        email = validated_data.pop('email')
        username = validated_data.pop('username')
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        middle_name = validated_data.pop('middle_name')
        gender = validated_data.pop('gender')
        phone_number = validated_data.pop('phone_number')
        shift_data = validated_data.pop('teacher_request_shifts')

        with transaction.atomic():
            user = CustomUser.objects.create_user(
                email=email,
                username=username,
                first_name=first_name,
                last_name=last_name,
                middle_name=middle_name,
                user_type=UserType.TEACHER,
                gender=gender,
                phone_number=phone_number
            )

            teacher = Teacher.objects.create(user=user, request_status=TeacherRequestStatus.REQUESTED, **validated_data)
            for shift in shift_data:
                TeacherRequestShift.objects.create(teacher=teacher, **shift)
            feePackage = FeePackage.objects.filter(payment_purpose=PaymentPurpose.APPLICATION).first()
            if(feePackage and feePackage.fee):
                payment_data = acceptPayment(
                    user,
                    feePackage.fee,
                    feePackage.name,
                    feePackage.name,
                    get_frontend_url(),
                    PaymentPurpose.APPLICATION,
                    None,
                    feePackage,
                    teacher.tin_no,
                    teacher.vat_reg_no,
                    teacher.vat_reg_date,
                    f'{teacher.region.name},{teacher.city.name}'
                )

                payment_response = payment_data.get("response")
                payment = payment_data.get("payment")

                if payment_response.get("status") == "success":
                    teacher._checkout_url = payment_response.get("data", {}).get(
                        "checkout_url"
                    )
                    teacher.application_fee = payment
                    teacher.save()
                else:
                    print(payment_response)
            # send_password_reset_link(email)
        return teacher

    def update(self, instance, validated_data):
        user = instance.user
        user_fields = ['email', 'username', 'first_name', 'last_name', 'middle_name', 'gender', 'phone_number']
        for field in user_fields:
            if field in validated_data:
                setattr(user, field, validated_data.pop(field))
        user.set_unusable_password()
        user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
class TeacherRequestShiftSerializer(CommonSerializer):
    teacher_detail = TeacherSerializer(source='teacher', read_only=True)
    institution_detail = InstitutionSerializer(source='institution', read_only=True)
    fee_package_detail = PackageSerializer(source='fee_package', read_only=True)
    shift_times_detail = ShiftSerializer(source='shift_times', read_only=True)

    class Meta:
        model = TeacherRequestShift
        fields = '__all__'

class TeacherClassShiftSerializer(serializers.ModelSerializer):
    teacher_detail = TeacherSerializer(source='teacher', read_only=True)
    institution_detail = InstitutionSerializer(source='institution', read_only=True)
    class_room_detail = ClassRoomSerializer(source='class_room', read_only=True)
    class_room_shift_detail = ClassRoomShiftSerializer(source='class_room_shift', read_only=True)
    teacher_request_shift_detail = TeacherRequestShiftSerializer(source='class_room_shift', read_only=True)

    class Meta:
        model = TeacherClassShift
        fields = '__all__'

class StudentRequestShiftSerializer(CommonSerializer):
    student_detail = StudentSerializer(source='student', read_only=True)
    institution_detail = InstitutionSerializer(source='institution', read_only=True)
    fee_package_detail = PackageSerializer(source='fee_package', read_only=True)
    shift_times_detail = ShiftSerializer(source='shift_times', read_only=True)

    class Meta:
        model = StudentRequestShift
        fields = '__all__'

class StudentClassShiftSerializer(CommonSerializer):
    student_detail = StudentSerializer(source='student', read_only=True)
    institution_detail = InstitutionSerializer(source='institution', read_only=True)
    class_room_detail = ClassRoomSerializer(source='class_room', read_only=True)
    class_room_shift_detail = ClassRoomShiftSerializer(source='class_room_shift', read_only=True)
    student_request_class_shift_detail = StudentRequestShiftSerializer(source='student_request_class_shift', read_only=True)

    class Meta:
        model = StudentClassShift
        fields = '__all__'

    def validate(self, attrs):
        class_room_shift = attrs.get("class_room_shift")
        if class_room_shift and class_room_shift.capacity is not None:
            current_count = StudentClassShift.objects.filter(
                class_room_shift=class_room_shift
            ).count()
            if current_count >= class_room_shift.capacity:
                raise serializers.ValidationError(
                    {"class_room_shift": "This class room shift has reached its maximum capacity."}
                )
        return attrs

