# payments/management/commands/regenerate_receipts.py
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.utils.timezone import localtime
from finance.enums import PaymentPurpose
from finance.models import ChapaWebhookEvent, Payment, PaymentStatus, InvoiceCounter
from commons.utils.pdf_generator import generate_receipt_pdf  # your receipt generation logic
from num2words import num2words
from django.db import transaction


class Command(BaseCommand):
    help = "Regenerate receipts for Chapa success webhook events"

    def add_arguments(self, parser):
        parser.add_argument(
            '--only-missing',
            action='store_true',
            help='Only regenerate if receipt is missing'
        )
    @transaction.atomic
    def handle(self, *args, **options):
        only_missing = options['only_missing']

        events = ChapaWebhookEvent.objects.filter(event='charge.success').order_by('-created_at')

        if not events.exists():
            self.stdout.write(self.style.WARNING("No chapa.success events found."))
            return

        count = 0
        for event in events:
            tx_ref = event.tx_ref
            if not tx_ref:
                continue

            try:
                payment = Payment.objects.get(ref_number=tx_ref, status=PaymentStatus.PAID)
                if not payment.invoice_no:
                    with transaction.atomic():
                        counter, _ = InvoiceCounter.objects.select_for_update().get_or_create(id=1, defaults={"counter": 1})
                        payment.invoice_no = f"{counter.counter:08d}" 
                        counter.counter += 1
                        counter.save()
                    payment.save()
            except Payment.DoesNotExist:
                self.stderr.write(self.style.ERROR(f"❌ Payment not found for tx_ref: {tx_ref}"))
                continue

            if only_missing and payment.receipt:
                self.stdout.write(f"⏩ Skipped {tx_ref}, receipt already exists.")
                continue

            try:
                data = {
                    "invoice_no": str(event.reference),
                    "local_invoice_no": str(payment.invoice_no),
                    "date": payment.create_date,
                    "payer_name": event.account_name or f"{event.first_name} {event.last_name}" or "Unknown",
                    "payer_account": event.account_number or event.mobile or "N/A",
                    "payer_tin": payment.tin_no or "N/A",
                    "payer_address": payment.address or "N/A",
                    "payer_phone": getattr(event, "mobile", "N/A"),
                    "vat_number": payment.vat_reg_no or "N/A",
                    "vat_date": payment.vat_reg_date or "N/A",
                    "transactions": [
                        {"no": payment.fee_package.item_code, "product": payment.fee_package.name, "amount": float(payment.amount)},
                    ],
                    "service_fee": float(payment.service_fee),
                    "tot": float(payment.tot_amount),
                    "vat": float(payment.vat_amount),
                    "total": float(payment.total_amount),
                    "amount_in_words": (num2words(payment.total_amount) or "Amount in words here") + " ETB",
                    "payment_method": event.payment_method or "Account",
                    "payment_status": event.status or "Success",
                }

                pdf_file = generate_receipt_pdf(data)
                payment.receipt.save(f"receipt_{payment.ref_number}.pdf", ContentFile(pdf_file.getvalue()), save=False)
                payment.save()

                count += 1
                self.stdout.write(self.style.SUCCESS(f"✅ Receipt regenerated for: {tx_ref}"))

            except Exception as e:
                self.stderr.write(self.style.ERROR(f"❌ Error for {tx_ref}: {str(e)}"))

        self.stdout.write(self.style.SUCCESS(f"\n🎉 Done. {count} receipts regenerated from chapa.success webhooks."))