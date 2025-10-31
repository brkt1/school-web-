from django.urls import path
from finance.views import PaymentDetailView, PaymentListCreateView, ChapaWebhookRetryView
from finance.views import PaymentWebhookEventDetailView, PaymentWebhookEventListCreateView
from finance.views import FeePackageDetailView, FeePackageListCreateView, ChapaWebhookView

urlpatterns = [
	path('payment-webhook-events',PaymentWebhookEventListCreateView.as_view(), name = 'payment-webhook-event'),
	path('payment-webhook-events/<uuid:pk>', PaymentWebhookEventDetailView.as_view(), name = 'payment-webhook-event-detail'),
	path('payments/',PaymentListCreateView.as_view(), name = 'payment'),
	path('payments/<uuid:pk>', PaymentDetailView.as_view(), name = 'payment-detail'),
	path('payments/<uuid:payment_id>/retry', ChapaWebhookRetryView.as_view(), name = 'chapa-retry'),
	# path('payments/<uuid:payment_id>/receipt', ReceiptPrintAPIView.as_view(), name = 'receipt'),
    path('fee-packages',FeePackageListCreateView.as_view(), name = 'fee-package'),
    path('fee-packages/<uuid:pk>', FeePackageDetailView.as_view(), name = 'fee-package-detail'),
    path('webhook/', ChapaWebhookView.as_view(), name='chapa-webhook'),
]