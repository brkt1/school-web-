'use client'
import InstitutionForm from "@/modules/organization/institution/components/institution.form";
import { useParams } from "next/navigation";

export default function InstitutionEdit(){
    const params = useParams()
    const id = params.id as string

    return <InstitutionForm id={id} />
}