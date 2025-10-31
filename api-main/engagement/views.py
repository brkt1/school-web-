from commons.utils.permissions import AllowGetOrCustomPermission, AllowPostOrCustomPermission
from commons.utils.filter_utils import fields_lookups
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from commons.utils.filter_utils import fields_lookups
from commons.utils.permissions import AllowGetOrCustomPermission, AllowPostOrCustomPermission
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from django.shortcuts import render
from engagement.serializers import NewsSerializer
from engagement.models import News
from engagement.serializers import BlogSerializer
from engagement.models import Blog
from engagement.serializers import GallerySerializer
from engagement.models import Gallery
from engagement.serializers import TestimonialSerializer
from engagement.models import Testimonial

class NewsListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = NewsSerializer
    queryset = News.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['title', 'main_content']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(News)

class NewsDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class BlogListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['title', 'short_description', 'main_content']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Blog)

class BlogDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class GalleryListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = GallerySerializer
    queryset = Gallery.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['title']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Gallery)

class GalleryDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

class TestimonialListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    serializer_class = TestimonialSerializer
    queryset = Testimonial.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['name', 'job', 'review']
    ordering_fields = '__all__'
    filterset_fields = fields_lookups(Testimonial)

class TestimonialDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowGetOrCustomPermission]
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

