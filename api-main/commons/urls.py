
from django.urls import path, include

urlpatterns = [
    path('', include("commons.authentication.urls"), name='authentication'),
    path("message/", include("commons.message_util.urls"), name="message"),
    path("feedback/", include("commons.feedback.urls"), name="feedback"),
    path("about_us/", include("commons.about_us.urls"), name="about_us"),
    path("text_chat/", include("commons.text_chat.urls"), name="text_chat"),
    path("notification/", include("commons.notification.urls"), name="notification"),
    path("file/", include("commons.file.urls"), name="file"),
    path("multi_languages/", include("commons.multi_languages.urls"), name="multi_languages"),
]
