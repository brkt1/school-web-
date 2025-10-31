from django.db import models
from commons.authentication.models import CustomUser
from commons.utils.model_utils import CommonsModel
from organization.models import Region, City, Institution, ClassRoom, ClassRoomShift
from lookup.models import Level, ClassType, Shift, Package
from finance.models import FeePackage, Payment
from .enums import StudentShiftStatus, TeacherRequestStatus, ShiftDays, TeacherShiftStatus, TeacherType


class Student(CommonsModel):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    grade = models.TextField()
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    woreda = models.TextField(null=True, blank=True)
    parents_phonenumber = models.TextField(null=True)
    class_type = models.ForeignKey(ClassType, on_delete=models.CASCADE, null=True, blank=True)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateField(null=True)
    tin_no = models.TextField(null=True, blank=True)
    vat_reg_no = models.TextField(null=True, blank=True)
    vat_reg_date = models.DateField(null=True, blank=True)
    tuition_fee = models.ForeignKey(Payment, on_delete=models.CASCADE, null=True, blank=True)


class Teacher(CommonsModel):
    def uploadFiles(instance, file_name):
        url = f"cv/{instance}/{file_name}"
        return url
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE
    )
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    educational_institution = models.TextField(null=True, blank=True)
    level_of_teaching = models.ForeignKey(Level, on_delete=models.CASCADE, null=True, blank=True)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    woreda = models.TextField(null=True, blank=True)
    cv = models.FileField(upload_to=uploadFiles, blank=True)
    request_status = models.IntegerField(choices=TeacherRequestStatus.choices, default=TeacherRequestStatus.REQUESTED)
    response_date = models.DateTimeField(blank=True,null=True)
    response_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="response_by", null=True, blank=True)
    application_fee = models.ForeignKey(Payment, on_delete=models.CASCADE, null=True, blank=True)
    tin_no = models.TextField(null=True, blank=True)
    vat_reg_no = models.TextField(null=True, blank=True)
    vat_reg_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return self.user.get_full_name()
    
class TeacherRequestShift(CommonsModel):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    teacher_type = models.IntegerField(choices=TeacherType.choices, default=TeacherType.TRAINING)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    fee_package = models.ForeignKey(Package, on_delete=models.CASCADE)
    shift_days = models.IntegerField(choices=ShiftDays.choices)
    shift_times = models.ForeignKey(Shift, on_delete=models.CASCADE, null=True, blank=True)
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        unique_together = ('teacher', 'institution', 'shift_days', 'start_time', 'end_time')

class TeacherClassShift(CommonsModel):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    teacher_type = models.IntegerField(choices=TeacherType.choices, default=TeacherType.TRAINING)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    class_room = models.ForeignKey(ClassRoom, on_delete=models.CASCADE, null=True, blank=True)
    class_room_shift = models.ForeignKey(ClassRoomShift, on_delete=models.CASCADE)
    status=models.IntegerField(choices=TeacherShiftStatus.choices, default=TeacherShiftStatus.ACTIVE)
    teacher_request_shift = models.ForeignKey(TeacherRequestShift, null=True, blank=True, on_delete=models.CASCADE)


class StudentRequestShift(CommonsModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    fee_package = models.ForeignKey(Package, on_delete=models.CASCADE)
    shift_days = models.IntegerField(choices=ShiftDays.choices)
    shift_times = models.ForeignKey(Shift, on_delete=models.CASCADE, null=True, blank=True)
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        unique_together = ('student', 'institution', 'shift_days', 'start_time', 'end_time')

class StudentClassShift(CommonsModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    class_room = models.ForeignKey(ClassRoom, on_delete=models.CASCADE, null=True, blank=True)
    class_room_shift = models.ForeignKey(ClassRoomShift, on_delete=models.CASCADE)
    status=models.IntegerField(choices=StudentShiftStatus.choices, default=StudentShiftStatus.ACTIVE)
    student_request_class_shift = models.ForeignKey(StudentRequestShift, null=True, blank=True, on_delete=models.CASCADE)

class PaymentShiftDetail(CommonsModel):
    payment = models.ForeignKey(
        Payment, on_delete=models.CASCADE, related_name="shift_details"
    )
    student_shift = models.ForeignKey(
        StudentRequestShift, on_delete=models.CASCADE, related_name="payment_details"
    )
    fee_package = models.ForeignKey(
        FeePackage, on_delete=models.SET_NULL, null=True, blank=True, related_name="payment_details"
    )
    amount = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    remarks = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.payment.ref_number} - {self.fee_package.name if self.fee_package else 'N/A'}"
