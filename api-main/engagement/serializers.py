from rest_framework import serializers
from commons.authentication.serializer import UserSerializer
from engagement.models import News
from engagement.models import Blog
from engagement.models import Gallery
from engagement.models import Testimonial
from engagement.models import Blog
from engagement.models import Testimonial
from engagement.models import Gallery
from commons.utils.serializers import CommonSerializer

class NewsSerializer(CommonSerializer):
    
    class Meta:
        model = News
        fields = '__all__'

class BlogSerializer(CommonSerializer):
    
    class Meta:
        model = Blog
        fields = '__all__'

class TestimonialSerializer(CommonSerializer):
    
    class Meta:
        model = Testimonial
        fields = '__all__'

class GallerySerializer(CommonSerializer):
    
    class Meta:
        model = Gallery
        fields = '__all__'

