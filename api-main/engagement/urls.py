from django.urls import path
from engagement.views import NewsDetailView, NewsListCreateView
from engagement.views import BlogDetailView, BlogListCreateView
from engagement.views import GalleryDetailView, GalleryListCreateView
from engagement.views import TestimonialDetailView, TestimonialListCreateView

urlpatterns = [
	path('news/<uuid:pk>', NewsDetailView.as_view(), name = 'news-detail'),
	path('gallerys',GalleryListCreateView.as_view(), name = 'gallery'),
	path('blogs/<uuid:pk>', BlogDetailView.as_view(), name = 'blog-detail'),
	path('news',NewsListCreateView.as_view(), name = 'news'),
	path('gallerys/<uuid:pk>', GalleryDetailView.as_view(), name = 'gallery-detail'),
	path('blogs',BlogListCreateView.as_view(), name = 'blog'),
    path('testimonials',TestimonialListCreateView.as_view(), name = 'testimonial'),
    path('testimonials/<uuid:pk>', TestimonialDetailView.as_view(), name = 'testimonial-detail'),
]