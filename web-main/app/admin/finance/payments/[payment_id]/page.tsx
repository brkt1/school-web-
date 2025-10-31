'use client'
import PaymentDetail from "@/modules/finance/payment/components/payment.detail";
import { useParams } from "next/navigation";

export default function Payment(){
    const params = useParams()
    const id = params.payment_id as string

    return <PaymentDetail id={id} />
}