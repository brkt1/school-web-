'use client'
import CityForm from "@/modules/organization/city/components/city.form";
import { useParams } from "next/navigation";

export default function CityEdit(){
    const params = useParams()
    const region = params.id as string
    const id = params.city_id as string

    return <CityForm id={id} detail_navigation={`/admin/organization/regions/${region}/citys`} />
}