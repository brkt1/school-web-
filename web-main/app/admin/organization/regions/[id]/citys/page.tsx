"use client";
import CitysList from "@/modules/organization/city/components/city.list";
import { useParams } from "next/navigation";

export default function Citys() {
  const params = useParams();
  const region = params.id as string;
  return (
    <div>
      <h1 className="font-bold text-lg my-2">Cities</h1>
      <CitysList region={region} add_navigation={`/admin/organization/regions/${region}/citys/create`} edit_navigation={`/admin/organization/regions/${region}/citys`}  />
    </div>
  );
}
