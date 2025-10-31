'use client'
import CityForm from "@/modules/organization/city/components/city.form";
import { useParams } from "next/navigation";

export default function CityEdit(){
    const params = useParams()
    const id = params.id as string

    return <CityForm id={id} />
}