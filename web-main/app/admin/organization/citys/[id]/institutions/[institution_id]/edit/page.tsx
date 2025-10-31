'use client'
import InstitutionForm from "@/modules/organization/institution/components/institution.form";
import { useParams } from "next/navigation";

export default function InstitutionEdit(){
    const params = useParams()
    const city = params.id as string
    const id = params.institution_id as string

    return <InstitutionForm id={id} detail_navigation={`/admin/organization/citys/${city}/institutions`}  />
}