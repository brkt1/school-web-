from rest_framework import serializers
from lookup.serializers import LevelSerializer, PackageSerializer
from commons.utils.serializers import CommonSerializer
from rest_framework import serializers
from finance.models import Payment
from finance.models import Payment
from finance.models import PaymentWebhookEvent
from commons.authentication.serializer import UserSerializer
from finance.models import FeePackage
from finance.models import FeePackage
from finance.models import Payment
from finance.models import PaymentWebhookEvent, ChapaWebhookEvent

class ChapaWebhookEventSerializer(CommonSerializer):
    class Meta:
        model = ChapaWebhookEvent
        fields = '__all__'

class FeePackageSerializer(CommonSerializer):
    level_detail = LevelSerializer(source='level',read_only=True)
    package_detail = PackageSerializer(source='package', read_only=True)
    
    class Meta:
        model = FeePackage
        fields = '__all__'

class PaymentSerializer(CommonSerializer):
    user_detail = UserSerializer(source='user', read_only=True)
    fee_package_detail = PackageSerializer(source='fee_package', read_only=True)
    latest_webhook = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = '__all__'
    
    def get_latest_webhook(self, obj):
        from .models import ChapaWebhookEvent

        try:
            event = (
                ChapaWebhookEvent.objects
                .filter(tx_ref=obj.ref_number)
                .order_by("-created_at")  # or use a DateTimeField if available
                .first()
            )
            if event:
                return ChapaWebhookEventSerializer(event).data
        except Exception as e:
            # Log or handle if needed
            return None

class PaymentWebhookEventSerializer(CommonSerializer):
    payment_detail = PaymentSerializer(source='payment', read_only=True)

    class Meta:
        model = PaymentWebhookEvent
        fields = '__all__'


class ReceiptRegenSerializer(serializers.Serializer):
    ref_numbers = serializers.ListField(
        child=serializers.CharField(), required=False
    )