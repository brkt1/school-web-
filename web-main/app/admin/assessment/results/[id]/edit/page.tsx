'use client'
import ResultForm from "@/modules/assessment/result/components/result.form";
import { useParams } from "next/navigation";

export default function ResultEdit(){
    const params = useParams()
    const id = params.id as string

    return <ResultForm id={id} />
}