from .models import Feedbacks, ContactUs
from .serializers import FeedbacksSerializer, ContactUsSerializer
from rest_framework import generics, filters
from commons.utils.permissions import CustomPermission, AllowPostOrCustomPermission
from commons.utils.enums import FeedbackType
# from django.db.models import F


class FeedbacksListCreateView(generics.ListCreateAPIView):
    permission_classes = [CustomPermission]
    serializer_class = FeedbacksSerializer
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['feedback', 'user__first_name','user__middle_name','user__last_name']
    ordering_fields  = ['feedback', 'user__first_name','user__middle_name','user__last_name']
    ordering = '-create_date'
    def get_queryset(self):
        return Feedbacks.objects.filter(feedback_type= FeedbackType.SEND)
    

class FeedbacksDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomPermission]
    queryset = Feedbacks.objects.all()
    serializer_class = FeedbacksSerializer



class ContactUsListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowPostOrCustomPermission]
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer

class ContactUsDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowPostOrCustomPermission]
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer
