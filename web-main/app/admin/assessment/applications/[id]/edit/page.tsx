'use client'
import ApplicationForm from "@/modules/assessment/application/components/application.form";
import { useParams } from "next/navigation";

export default function ApplicationEdit(){
    const params = useParams()
    const id = params.id as string

    return <ApplicationForm id={id} />
}