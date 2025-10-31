'use client'
import FeePackageDetail from "@/modules/finance/fee_package/components/fee_package.detail";
import { useParams } from "next/navigation";

export default function FeePackage(){
    const params = useParams()
    const id = params.fee_package_id as string

    return <FeePackageDetail id={id} />
}