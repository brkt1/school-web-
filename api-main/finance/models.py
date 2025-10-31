from decimal import ROUND_HALF_UP, Decimal
from django.db import models, transaction
from django.forms import ValidationError
from commons.authentication.models import CustomUser
from commons.utils.model_utils import CommonsModel
from .enums import PaymentStatus, PaymentPurpose
from django.utils import timezone
from lookup.models import Level
from lookup.models import Package
import uuid


class FeePackage(CommonsModel):
    name = models.TextField()
    item_code = models.CharField(max_length=10, unique=True, editable=False)
    payment_purpose = models.IntegerField(choices=PaymentPurpose.choices, default=PaymentPurpose.TUITION)
    level = models.ForeignKey(Level, on_delete=models.CASCADE, null=True, blank=True)
    package = models.ForeignKey(Package, on_delete=models.CASCADE, null=True, blank=True)
    fee = models.DecimalField(decimal_places=2, max_digits=10)
    description = models.TextField()


    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.item_code:
            last_item = FeePackage.objects.order_by("item_code").last()
            if last_item and last_item.item_code.isdigit():
                next_number = int(last_item.item_code) + 1
            else:
                next_number = 1
            self.item_code = str(next_number).zfill(3)
        super().save(*args, **kwargs)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['payment_purpose', 'level', 'package'],
                name='unique_fee_package_combination'
            )
        ]

class InvoiceCounter(models.Model):
    counter = models.PositiveIntegerField(default=1)

    @classmethod
    def generate_invoice_number(cls):
        with transaction.atomic():
            counter = cls.objects.select_for_update().first()
            if not counter:
                counter = cls.objects.create(counter=1)

            invoice_number = f"{counter.counter:08d}"  # Zero-padded
            counter.counter += 1
            counter.save()
            return invoice_number

# Create your models here.
class Payment(CommonsModel):
    def uploadFiles(instance, file_name):
        url = f"receipt/{instance}/{file_name}"
        return url
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(decimal_places=2, max_digits=10)
    service_fee = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    total_amount = models.DecimalField(decimal_places=2, max_digits=10)
    vat_amount = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    tot_amount = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    date = models.DateTimeField()
    payment_date = models.DateTimeField(null=True, blank=True)
    receipt = models.FileField(upload_to=uploadFiles, null=True, blank=True)
    ref_number = models.TextField(unique=True, editable=False)
    title = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    return_url = models.TextField(null=True, blank=True)
    status = models.IntegerField(choices=PaymentStatus.choices)
    payment_for = models.IntegerField(choices=PaymentPurpose.choices, null=True)
    checkout_url = models.URLField(null=True, blank=True)
    tin_no = models.TextField(null=True, blank=True)
    vat_reg_no = models.TextField(null=True, blank=True)
    vat_reg_date = models.DateField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    fee_package = models.ForeignKey(FeePackage, on_delete=models.CASCADE, null=True, blank=True)
    invoice_no = models.CharField(max_length=30, unique=True, null=True, blank=True)

    SERVICE_PERCENT = Decimal('0.02')
    VAT_PERCENT = Decimal('0.15')
    TOT_PERCENT = Decimal('0.10')
    DECIMAL_QUANT = Decimal('0.01')

    def save(self, *args, **kwargs):
        # Calculate fees based on amount (a Decimal)
        # self.service_fee = (self.amount * self.SERVICE_PERCENT).quantize(
        #     self.DECIMAL_QUANT, rounding=ROUND_HALF_UP
        # )
        self.vat_amount = (self.amount * self.VAT_PERCENT).quantize(
            self.DECIMAL_QUANT, rounding=ROUND_HALF_UP
        )
        # self.tot_amount = (self.amount * self.TOT_PERCENT).quantize(
        #     self.DECIMAL_QUANT, rounding=ROUND_HALF_UP
        # )
        self.total_amount = (self.amount + self.vat_amount).quantize(
            self.DECIMAL_QUANT, rounding=ROUND_HALF_UP
        )

        if not self.ref_number:
            self.ref_number = self.generate_ref_number()

        super().save(*args, **kwargs)

    def generate_ref_number(self):
        return f"CHAPA-{uuid.uuid4().hex[:12].upper()}"
    

    def __str__(self):
        return self.ref_number
    
    @property
    def fee_packages(self):
        return FeePackage.objects.filter(payment_details__payment=self).distinct()

class PaymentWebhookEvent(models.Model):
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name="webhook_events")
    event_type = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    payload = models.JSONField()
    received_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.event_type} - {self.status} - {self.received_at}"

class ChapaWebhookEvent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.TextField(null=True, blank=True)
    event_type = models.TextField(null=True, blank=True)
    account_name = models.TextField(null=True, blank=True)
    account_number = models.TextField(null=True, blank=True)
    bank_id = models.TextField(null=True, blank=True)
    bank_name = models.TextField(null=True, blank=True)
    amount = models.TextField(null=True, blank=True)
    charge = models.TextField(null=True, blank=True)
    currency = models.TextField(null=True, blank=True)
    status = models.TextField(null=True, blank=True)
    reference = models.TextField(null=True, blank=True)
    chapa_reference = models.TextField(null=True, blank=True)
    bank_reference = models.TextField(null=True, blank=True)
    created_at = models.TextField(null=True, blank=True)
    updated_at = models.TextField(null=True, blank=True)
    first_name = models.TextField(null=True, blank=True)
    last_name = models.TextField(null=True, blank=True)
    email = models.TextField(null=True, blank=True)
    mobile = models.TextField(null=True, blank=True)
    mode = models.TextField(null=True, blank=True)
    tx_ref = models.TextField(null=True, blank=True)
    payment_method = models.TextField(null=True, blank=True)
    customization = models.JSONField(null=True, blank=True)
    meta = models.TextField(null=True, blank=True)
    row_data = models.JSONField()

    class Meta:
        unique_together = [('reference',)]

    def __str__(self):
        return self.tx_ref

