import requests
from finance.enums import PaymentStatus
from finance.models import Payment
from take_the_stage.settings import CHAPA_SECRET_KEY, CHAPA_CALLBACK_URL, CHAPA_API_URL
from django.utils import timezone

accept_url = f"{CHAPA_API_URL}/transaction/initialize"
headers = {
    'Authorization': f'Bearer {CHAPA_SECRET_KEY}',
    'Content-Type': 'application/json'
}

def acceptPayment(user, amount, title, description, return_url=None, payment_for=None, receipt=None, fee_package=None, tin_no=None, vat_reg_no=None, vat_reg_date=None, address=None):
    payment = Payment.objects.create(
        user=user,
        amount=amount,
        date=timezone.now(),
        status=PaymentStatus.PENDING,
        payment_for=payment_for,
        receipt=receipt,
        fee_package=fee_package,
        title=title,
        description=description,
        return_url=return_url,
        tin_no=tin_no,
        vat_reg_no=vat_reg_no,
        vat_reg_date=vat_reg_date,
        address=address
    )

    # Now that payment.id exists, compute the new return URL
    payment.return_url = f"{return_url}receipt/{payment.id}"
    payment.save(update_fields=["return_url"])

    return _initialize_chapa_payment(payment, user, amount, title, description, payment.return_url)


def retryPayment(payment_id):
    try:
        payment = Payment.objects.get(id=payment_id)
    except Payment.DoesNotExist:
        return {"error": "Payment not found."}

    # Only retry if payment status is not success
    if payment.status == PaymentStatus.PAID:
        return {"message": "Payment already successful.", "payment": payment}

    # Re-initialize payment
    return _initialize_chapa_payment(payment, payment.user, payment.amount, payment.title, payment.description, payment.return_url)


def _initialize_chapa_payment(payment, user, amount, title, description, return_url):
    payload = {
        "amount": str(payment.total_amount),
        "currency": "ETB",
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "phone_number": user.phone_number,
        "tx_ref": payment.ref_number,
        "callback_url": CHAPA_CALLBACK_URL,
        "return_url": return_url,
        "customization": {
            "title": title,
            "description": description
        }
    }

    response = requests.post(accept_url, json=payload, headers=headers)
    result = response.json()

    if response.ok and result.get("status") == "success":
        checkout_url = result["data"].get("checkout_url")
        if checkout_url:
            payment.checkout_url = checkout_url
            payment.status = PaymentStatus.PENDING  # reset to pending on retry
            payment.save()

    return {
        "response": result,
        "payment": payment
    }


def verifyPayment(tx_ref):
    url = f"{CHAPA_API_URL}/transaction/verify/{tx_ref}"

    response = requests.get(url, headers=headers)

    if response.ok:
        return response.json()
    else:
        return None
