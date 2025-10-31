'use client'
import ShiftDetail from "@/modules/lookup/shift/components/shift.detail";
import { useParams } from "next/navigation";

export default function Shift(){
    const params = useParams()
    const id = params.id as string

    return <ShiftDetail id={id} />
}