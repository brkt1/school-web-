'use client'
import InstitutionDetail from "@/modules/organization/institution/components/institution.detail";
import { useParams } from "next/navigation";

export default function Institution(){
    const params = useParams()
    const id = params.id as string

    return <InstitutionDetail id={id} />
}