'use client'
import PackageForm from "@/modules/lookup/package/components/package.form";
import { useParams } from "next/navigation";

export default function PackageEdit(){
    const params = useParams()
    const id = params.id as string

    return <PackageForm id={id} />
}