'use client'
import ContactUsDetail from "@/modules/feedback/contact_us/components/contact_us.detail";
import { useParams } from "next/navigation";

export default function ContactUs(){
    const params = useParams()
    const id = params.contact_us_id as string

    return <ContactUsDetail id={id} />
}