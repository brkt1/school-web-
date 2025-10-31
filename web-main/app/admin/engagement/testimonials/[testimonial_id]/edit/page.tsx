'use client'
import TestimonialForm from "@/modules/engagement/testimonial/components/testimonial.form";
import { useParams } from "next/navigation";

export default function TestimonialEdit(){
    const params = useParams()
    const id = params.testimonial_id as string

    return <TestimonialForm id={id} />
}