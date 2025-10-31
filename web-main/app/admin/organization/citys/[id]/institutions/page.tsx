'use client';
import InstitutionList from "@/modules/organization/institution/components/institution.list";
import { useParams } from "next/navigation";

export default function Institutions() {
  const params = useParams();
  const city = params.id as string;
  return (
    <div>
      <h1 className="font-bold text-lg my-2">Institutions</h1>
      <InstitutionList city={city} add_navigation={`/admin/organization/citys/${city}/institutions/create`} edit_navigation={`/admin/organization/citys/${city}/institutions`} />
    </div>
  );
}
