'use client'
import PackageDetail from "@/modules/lookup/package/components/package.detail";
import { useParams } from "next/navigation";

export default function Package(){
    const params = useParams()
    const id = params.id as string

    return <PackageDetail id={id} />
}