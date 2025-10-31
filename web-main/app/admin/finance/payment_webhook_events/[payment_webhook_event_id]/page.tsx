'use client'
import PaymentWebhookEventDetail from "@/modules/finance/payment_webhook_event/components/payment_webhook_event.detail";
import { useParams } from "next/navigation";

export default function PaymentWebhookEvent(){
    const params = useParams()
    const id = params.payment_webhook_event_id as string

    return <PaymentWebhookEventDetail id={id} />
}