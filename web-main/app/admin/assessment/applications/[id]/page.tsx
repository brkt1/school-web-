'use client'
import ApplicationDetail from "@/modules/assessment/application/components/application.detail";
import { useParams } from "next/navigation";

export default function Application(){
    const params = useParams()
    const id = params.id as string

    return <ApplicationDetail id={id} />
}