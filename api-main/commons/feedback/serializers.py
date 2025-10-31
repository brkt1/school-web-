from rest_framework import serializers
from .models import Feedbacks, ContactUs
from commons.utils.enums import FeedbackType

class FeedbacksSerializer(serializers.ModelSerializer):
    replies =serializers.SerializerMethodField()
    class Meta:
        model = Feedbacks
        fields = ['id','user','username','feedback','feedback_type', 'submission_date','parent','no_of_replies','replies']

    def validate(self, attribute):
        if attribute.get('feedback_type') == FeedbackType.SEND and attribute.get('parent') is not None:
            raise serializers.ValidationError( "parent id must be null when you sending")
        elif attribute.get('feedback_type') == FeedbackType.REPLAY and attribute.get('parent') is None:
            raise serializers.ValidationError( "parent id must not be null when you replay")
        return attribute
    
     
    def get_replies(self, obj):
            return FeedbacksSerializer(obj.replies, many = True).data
class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = '__all__'