'use client'
import TestimonialDetail from "@/modules/engagement/testimonial/components/testimonial.detail";
import { useParams } from "next/navigation";

export default function Testimonial(){
    const params = useParams()
    const id = params.testimonial_id as string

    return <TestimonialDetail id={id} />
}