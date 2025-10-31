from commons.utils.token_generator import token_uid_petitions_url_generator, token_uid_url_generator,token_uid_code_url_gen
from django.conf import settings
from django.core.mail import send_mail
from allauth.account.models import EmailConfirmation, EmailAddress
from allauth.account.adapter import DefaultAccountAdapter
from take_the_stage.settings import env, get_frontend_url, get_hunter_api_key
from commons.authentication.models import CustomUser
from allauth.account.adapter import get_adapter
from django.utils import timezone
from allauth.account import signals
from allauth.account.models import EmailConfirmation, EmailAddress
from allauth.account.adapter import get_adapter
from django.utils import timezone
from allauth.account import signals
from smtplib import SMTPException
import socket
from .adapter import send_transactional_email
import requests
from django.core.mail import EmailMessage

from rest_framework import serializers

def send_password_reset_link(email):
    user_data = CustomUser.objects.filter(email=email).first()
    reset_confirm_url = token_uid_url_generator(email, user_data)
    if (reset_confirm_url and user_data) is not None:
        user_data and send_email_to_reset_password_user(reset_confirm_url, user_data)

def send_email_confirm_password_reset_link(email):
    user_data = CustomUser.objects.filter(email=email).first()
    reset_confirm_url = token_uid_code_url_gen(email, user_data)
    if (reset_confirm_url and user_data) is not None:
        send_email_to_reset_password_user(reset_confirm_url, user_data)

def create_email_confirmation(email):
        email_address = EmailAddress.objects.filter(email=email).first()
        if email_address is not None:
            is_confirmation_sent = EmailConfirmation.objects.filter(email_address_id=email_address.id).exists()
            if email_address and not is_confirmation_sent:
                result = EmailConfirmation.objects.create(
                            email_address=email_address,
                            created=timezone.now(),
                            sent=timezone.now(),
                            key=get_adapter().generate_emailconfirmation_key(email))
                return result is not None

            elif is_confirmation_sent:
                if(CustomAdapter.send_confirmation_mail(email) is int):
                    signals.email_confirmation_sent.send(
                        sender=self.__class__,
                        request=self.request,
                        confirmation=self,
                        signup=True,
                    )
def send_verify_petition_link(petition_data):
    verify_petition_url = token_uid_petitions_url_generator(petition_data.email, petition_data)
    if (verify_petition_url) is not None:
        petition_data and send_email_to_verify_petitions(verify_petition_url, petition_data)

def send(self,email):
    if create_email_confirmation(email):
        if(CustomAdapter.send_confirmation_mail(email) is int):
            signals.email_confirmation_sent.send(
                sender=self.__class__,
                request=self.request,
                confirmation=self,
                signup=True,
            )
            return True
    else:
        return False

def verify_email(email):
    api_key = get_hunter_api_key()
    url = f"https://api.hunter.io/v2/email-verifier?email={email}&api_key={api_key}"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to verify email"}

def send_email_to_user(user, subject, body_text, body_html):
    message = {
        'subject': subject,
        'message_body': body_text
    }
    send_email(body_html, message, user.email)

def send_email_to_reset_password_user(reset_confirm_url, user_data):
    message = {'subject': 'Password reset confirmation',
                'message_body': 'Please click the following link to confirm your password reset:' + reset_confirm_url}
    html_message = f'''
        <html>
        <body>
            <h3 style="color:#ff735c">Password Reset Request</h3>
            <h1>Hi, {user_data.first_name}</h1>
            <p>We have received a request to reset the password for your account.
            To proceed with the password reset, please click on the link below:.</p>
            <a href="{reset_confirm_url}" style="display: inline-block; padding: 10px 20px;
            background-color: #ff735c; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>

            <p style="margin-top:10px">If you did not make this request, please ignore this email. Your account security is important to us.</p>
            <p>Thank you</p>
            <p>Take The Stage</p>
        </body>
        </html>
    '''
    send_email(html_message, message, user_data.email)

def send_email_to_verify_petitions(verify_petitions_url, user_data):
    message = {'subject': 'Petition Verification',
                'message_body': 'To complete the verification process, please click on the link:' + verify_petitions_url}
    html_message = f'''
       <html>
    <body>
        <h3 style="color:#ff735c">Petition Verification Request</h3>
        <h1>Hi, {user_data.first_name}</h1>
        <p>We have received a request to verify your petition signing.
        To complete the verification process, please click on the link below:</p>
        <a href="{verify_petitions_url}" style="display: inline-block; padding: 10px 20px;
        background-color: #ff735c; color: white; text-decoration: none; border-radius: 5px;">Verify Petition</a>

        <p style="margin-top:10px">If you did not make this request, please ignore this email. Your petition signing security is important to us.</p>
        <p>Thank you</p>
        <p>Take The Stage</p>
    </body>
 </html>
    '''
    send_email(html_message, message, user_data.email)

def send_email_to_verify_contact_form(contact_form):
    message = {'subject': 'Confirmation: We’ve Received Your Message', 'message_body': ''}
    html_message = f"""
                    <!DOCTYPE html>
                    <html>
                    <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; background-image: linear-gradient(to right, #F35B05, #2D4788); margin: 0; padding: 0; }}
                        .email-container {{ max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }}
                        .email-header {{ background-color: #F35B05; color: white; padding: 20px; text-align: center; }}
                        .email-body {{ padding: 20px; }}
                        .email-body h1 {{ color: #333; }}
                        .details {{ margin: 20px 0; padding: 10px; background: #f2f2f2; border-left: 4px solid #F35B05; }}
                        .details p {{ margin: 0; padding: 5px 0; }}
                        .email-footer {{ text-align: center; padding: 10px; background-color: #f1f1f1; font-size: 12px; color: #777; }}
                        .email-footer a {{ color: #F35B05; text-decoration: none; }}
                    </style>
                    </head>
                    <body>
                    <div class="email-container">
                        <div class="email-header">
                        <h1>Message Received!</h1>
                        </div>
                        <div class="email-body">
                        <h1>Dear {contact_form.full_name},</h1>
                        <p>Thank you for contacting us. We’ve received your message and will review it shortly. Here are the details you provided:</p>
                        <div class="details">
                            <p><strong>Name:</strong> {contact_form.full_name}</p>
                            <p><strong>Email:</strong> {contact_form.email}</p>
                            <p><strong>Subject:</strong> {contact_form.subject}</p>
                            <p><strong>Message:</strong> {contact_form.message}</p>
                        </div>
                        </div>
                        <div class="email-footer">
                        <p>Best regards,</p>
                        <p><strong>Take The Stage</strong></p>
                        <p><a href="https://takethestage.org">Visit our website</a></p>
                        </div>
                    </div>
                    </body>
                    </html>
                """
    send_email(html_message, message, contact_form.email)

class CustomAdapter(DefaultAccountAdapter):
    def send_confirmation_mail(email):
            current_site = get_frontend_url()+'verify_email/'
            user_data = CustomUser.objects.filter(email=email).first()
            if user_data is not None:
                confirmationData = EmailConfirmation.objects.filter(email_address__email=email).first()
                if confirmationData is not None:
                    reset_confirm_url = f'{confirmationData.key}'
                    reset_confirm_url = current_site + reset_confirm_url
                    message = {'subject': 'Email Verification',
                                'message_body': 'Please click the following link to verify your email:' + reset_confirm_url}
                    html_message = f'''
                    <html>
                    <body>
                        <h3 style="color:#ff735c">Verify Your Email Address</h3>
                        <h1>Dear, {user_data.first_name}</h1>
                        <p>We're excited to get you started.
                            Simply click on the button so we know this email address belongs to you.</p>
                        <a href="{reset_confirm_url}" style="display: inline-block; padding: 10px 20px;
                        background-color: #ff735c; color: white; text-decoration: none; border-radius: 5px;">Verify Your Email.</a>
                        <p>If you did not sign up for an account, please disregard this email.</p>
                        <h2 style="margin-top:20px; margin-bottom:20px;">Welcome to Tutorhub!</h2>
                        <p>Best regards,</p>
                        <p>Take The Tewahedo</p>
                    </body>
                    </html>
                    '''
                    send_email(html_message, message, email)


def send_email(html_message, message, email):
    try:
        return send_mail(
            subject=message['subject'],
            message=message['message_body'],
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            html_message=html_message,
            fail_silently=False  # Useful for catching errors
        )
    except socket.gaierror:
        raise serializers.ValidationError('Connection failed. Please check your internet connection.')
    except SMTPException as e:
        raise serializers.ValidationError(f'Email sending failed: {str(e)}')

import threading

def send_email_in_thread(*args, **kwargs):
    threading.Thread(target=send_receipt_email, args=args, kwargs=kwargs).start()


def send_receipt_email(user, subject, body_text, body_html, pdf_buffer, filename="receipt.pdf"):
    email = EmailMessage(
        subject=subject,
        body=body_html,
        from_email=settings.EMAIL_HOST_USER,
        to=[user.email],
    )
    email.content_subtype = 'html'
    email.attach(filename, pdf_buffer.getvalue(), 'application/pdf')
    email.send()

def get_teacher_approval_email(user):
    subject = 'Your Teacher Application is Approved'
    body_text = 'Congratulations! Your teacher application has been approved.'
    body_html = f'''
        <html>
        <body>
            <h3 style="color:#28a745">Application Approved</h3>
            <h1>Hi, {user.first_name}</h1>
            <p>Congratulations! Your teacher application has been reviewed and approved.</p>
            <p>You can now access the platform with your existing credentials.</p>
            <p>
            <a href="https://takethestageplc.com/login" style="color: #007bff; text-decoration: none;">
                Click here to log in
            </a>
            </p>
            <p>Thank you</p>
            <p>Take The Stage</p>
        </body>
        </html>
    '''
    return subject, body_text, body_html


def get_teacher_rejection_email(user):
    subject = 'Your Teacher Application is Rejected'
    body_text = 'We regret to inform you that your teacher application has been rejected.'
    body_html = f'''
        <html>
        <body>
            <h3 style="color:#dc3545">Application Rejected</h3>
            <h1>Hi, {user.first_name}</h1>
            <p>We’re sorry, but your teacher application has been reviewed and rejected.</p>
            <p>You may register again with updated information.</p>
            <p>Thank you for your interest.</p>
            <p>Take The Stage</p>
        </body>
        </html>
    '''
    return subject, body_text, body_html