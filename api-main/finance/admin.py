from django.contrib import admin
from finance.models import Payment
from finance.models import Payment
from finance.models import PaymentWebhookEvent


admin.site.register(Payment)
admin.site.register(PaymentWebhookEvent)
