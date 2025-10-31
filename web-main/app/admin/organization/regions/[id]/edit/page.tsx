'use client'
import RegionForm from "@/modules/organization/region/components/region.form";
import { useParams } from "next/navigation";

export default function RegionEdit(){
    const params = useParams()
    const id = params.id as string

    return <RegionForm id={id} />
}