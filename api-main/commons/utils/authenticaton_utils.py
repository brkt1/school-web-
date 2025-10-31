from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
from .regex_utils import token_regex, uuid_regex
import re


class DefaultAccountAdapterCustom(DefaultAccountAdapter):

    def send_mail(self, template_prefix, email, context):
        # if 'activate_url' in context:
        #     context['activate_url'] = settings.URL_FRONT + \
        #     'verify-email/' + context['key']
        # elif 'password_reset_url' in context:
        #     try:
        #         token_pattern = re.compile(token_regex)
        #         uuid_pattern = re.compile(uuid_regex)
        #         uuid= uuid_pattern.findall(context['password_reset_url'])[0]
        #         token= token_pattern.findall(context['password_reset_url'])[0]
        #         context['password_reset_url'] = settings.URL_FRONT +\
        #             'reset_pwd/' + uuid +"/" +token
        #     except:
        #         raise Exception('INCONCORRECT ACCESS')
        msg = self.render_mail(template_prefix, email, context)
        msg.send()
