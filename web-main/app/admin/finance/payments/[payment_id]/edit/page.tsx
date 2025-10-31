'use client'
import PaymentForm from "@/modules/finance/payment/components/payment.form";
import { useParams } from "next/navigation";

export default function PaymentEdit(){
    const params = useParams()
    const id = params.payment_id as string

    return <PaymentForm id={id} />
}