from django.urls import path 
from .views import FeedbacksDetail, FeedbacksListCreateView, ContactUsDetail, ContactUsListCreateView

urlpatterns = [
    path('',FeedbacksListCreateView.as_view(), name = 'feedback-list'),
    path('<uuid:pk>/', FeedbacksDetail.as_view(), name = 'feedback-detail'),
    path('contact_us', ContactUsListCreateView.as_view(), name = "contact_us-list"),
    path('contact_us/<uuid:pk>', ContactUsDetail().as_view(), name = "contact_us-detail"),
]

