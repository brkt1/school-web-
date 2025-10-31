'use client';
import InstitutionForm from "@/modules/organization/institution/components/institution.form";
import { useParams } from "next/navigation";

export default function InstitutionCreate(){
    const params = useParams();
    const city = params.id as string;
    return <InstitutionForm city={city}  list_navigation={`/admin/organization/citys/${city}/institutions`} />
}