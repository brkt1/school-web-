'use client'
import CityDetail from "@/modules/organization/city/components/city.detail";
import { useParams } from "next/navigation";

export default function City(){
    const params = useParams()
    const id = params.city_id as string

    return <CityDetail id={id} />
}