'use client'
import ResultDetail from "@/modules/assessment/result/components/result.detail";
import { useParams } from "next/navigation";

export default function Result(){
    const params = useParams()
    const id = params.id as string

    return <ResultDetail id={id} />
}