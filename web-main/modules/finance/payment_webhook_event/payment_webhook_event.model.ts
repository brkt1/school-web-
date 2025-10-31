import { Payment } from "../payment/payment.model";

export interface PaymentWebhookEvent {
    id: any;
    payment: string;
    payment_detail: Payment;
    event_type: string;
    status: string;
    payload: any;
    received_at: string | Date;
}