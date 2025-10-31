from django.urls import path,include,re_path
from .views import SendEmail

urlpatterns = [
    path("send_email/",SendEmail.as_view()),
]
