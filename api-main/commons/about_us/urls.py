from django.urls import path
from .views import AboutUsListCreateView, AboutUssDetail

urlpatterns = [
    path('', AboutUsListCreateView.as_view(), name='about_us-list'),
    path('<uuid:pk>/', AboutUssDetail.as_view(), name='about_us-detail')
]
