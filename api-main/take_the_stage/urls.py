"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
# from drf_spectacular.views import (
#     SpectacularAPIView,
#     SpectacularRedocView,
#     SpectacularSwaggerView
# )
from django.conf import settings
from take_the_stage.file_util import ProtectedFileHandlerView, securePdf
urlpatterns = [
    path('chapa-webhook', include('django_chapa.urls')),
    path('admin/', admin.site.urls),
    path('commons/', include("commons.urls")),
    # path('applications/', include("medias.urls")),
    path('accounts/', include("accounts.urls")),
    path('assessment/', include("assessment.urls")),
    path('engagement/', include("engagement.urls")),
    path('finance/', include("finance.urls")),
    path('organization/', include("organization.urls")),
    path('lookup/', include("lookup.urls")),
    path("media/media/<str:file>", ProtectedFileHandlerView.as_view(), name="media_file"),
    # path("media/media/<str:file>", securePdf, name="media_file"),
    

    # path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # path("api/schema/redoc/", SpectacularRedocView.as_view(
    #     url_name="schema"), name="redoc",),
    # path("api/schema/swagger-ui/", SpectacularSwaggerView.as_view(
    #     url_name="schema"), name="swagger-ui")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
