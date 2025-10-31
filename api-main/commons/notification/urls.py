import notifications.urls
from django.urls import path, include

urlpatterns = [
    path('', include(notifications.urls, namespace='notifications')),
]
