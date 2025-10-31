'use client'
import PaymentWebhookEventForm from "@/modules/finance/payment_webhook_event/components/payment_webhook_event.form";
import { useParams } from "next/navigation";

export default function PaymentWebhookEventEdit(){
    const params = useParams()
    const id = params.payment_webhook_event_id as string

    return <PaymentWebhookEventForm id={id} />
}