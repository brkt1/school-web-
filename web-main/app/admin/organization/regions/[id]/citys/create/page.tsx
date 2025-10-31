'use client';
import CityForm from "@/modules/organization/city/components/city.form";
import { useParams } from "next/navigation";

export default function CityCreate(){
    const params = useParams();
    const region = params.id as string;
    return <CityForm region={region}  list_navigation={`/admin/organization/regions/${region}/citys`} />
}