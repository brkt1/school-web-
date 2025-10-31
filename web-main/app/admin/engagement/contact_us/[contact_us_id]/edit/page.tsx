'use client'
import ContactUsForm from "@/modules/feedback/contact_us/components/contact_us.form";
import { useParams } from "next/navigation";

export default function ContactUsEdit(){
    const params = useParams()
    const id = params.contact_us_id as string

    return <ContactUsForm id={id} />
}