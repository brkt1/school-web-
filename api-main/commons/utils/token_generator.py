from django.utils.encoding import force_str
from allauth.account.forms import default_token_generator
from allauth.account.utils import url_str_to_user_pk as uid_decoder
from commons.authentication.models import CustomUser
from take_the_stage.settings import env
from take_the_stage.settings import get_frontend_url
from allauth.account.models import EmailAddress, EmailConfirmation

def token_uid_url_generator(email, user_data):
    current_site = get_frontend_url()+'activation/'
    if (user_data and email) is not None:   
        uid, token = token_uid_gen(user_data)
        reset_confirm_url=current_site + f'{uid}/{token}'
        return reset_confirm_url

def token_uid_code_url_gen(email, user_data):
    current_site = get_frontend_url()+'activation/'
    confirm_obj = EmailConfirmation.objects.filter(email_address__email=email).first()
    if (confirm_obj and user_data) is not None:
        uid, token = token_uid_gen(user_data)
        code = confirm_obj.key
        reset_confirm_url = current_site + f"{uid}/{token}/{code}"
        return reset_confirm_url

def token_uid_gen(user_data):
    uid = force_str(uid_decoder(user_data.id))
    token = default_token_generator.make_token(user_data)
    return (uid, token)


def token_uid_petitions_url_generator(email, user_data):
    current_site = get_frontend_url()+'en/petitions/verify/'
    if (user_data and email) is not None:   
        uid = user_data.id
        reset_confirm_url=current_site + f'{uid}'
        return reset_confirm_url