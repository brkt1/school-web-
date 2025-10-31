from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
from django.template.loader import render_to_string
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from django.contrib.sites.shortcuts import get_current_site

class CustomAccountAdapter(DefaultAccountAdapter):
    def send_confirmation_mail(self, request, emailconfirmation, signup):
        # Générer l'URL de confirmation
        activate_url = self.get_email_confirmation_url(request, emailconfirmation)
        # Obtenir le site actuel
        current_site = get_current_site(request)
        context = {
            'user': emailconfirmation.email_address.user,
            'activate_url': activate_url,
            'current_site': current_site,
            'key': emailconfirmation.key,
            'signup': signup,
        }
        # Rendre les templates
        subject = render_to_string('account/email/email_confirmation_subject.txt', context).strip()
        message = render_to_string('account/email/email_confirmation_message.html', context)
        # Configurer l'API Brevo
        configuration = sib_api_v3_sdk.Configuration()
        configuration.api_key['api-key'] = settings.BREVO_API_KEY
        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
        # Créer l'email

        # Créer l'email avec le sender
        send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
            sender={
                "email": settings.BREVO_SENDER['EMAIL'],
                "name": settings.BREVO_SENDER['NAME']
            },
            to=[{
                "email": emailconfirmation.email_address.email,
                "name": emailconfirmation.email_address.user.email
            }],
            subject=subject,
            html_content=message,
        )

        # Envoyer l'email
        try:
            api_instance.send_transac_email(send_smtp_email)
        except ApiException as e:
            print(f"Erreur lors de l'envoi de l'email de confirmation : {e}")

def send_transactional_email(email, message, content):
    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = settings.BREVO_API_KEY
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
    # Créer l'email

    # Créer l'email avec le sender
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        sender={
            "email": settings.BREVO_SENDER['EMAIL'],
            "name": settings.BREVO_SENDER['NAME']
        },
        to=[{
            "email": email,
            "name": email
        }],
        subject=message['subject'],
        html_content=content or message['message_body'],
    )

    # Envoyer l'email
    try:
        api_instance.send_transac_email(send_smtp_email)
    except ApiException as e:
        print(f"Erreur lors de l'envoi de l'email de confirmation : {e}")