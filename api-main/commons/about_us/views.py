from commons.about_us.models import AboutUs
from rest_framework import generics

from commons.about_us.serializer import AboutUsSerializer

# Create your views here.


class AboutUsListCreateView(generics.ListCreateAPIView):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer


class AboutUssDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer
