'use client'
import FeePackageForm from "@/modules/finance/fee_package/components/fee_package.form";
import { useParams } from "next/navigation";

export default function FeePackageEdit(){
    const params = useParams()
    const id = params.fee_package_id as string

    return <FeePackageForm id={id} />
}