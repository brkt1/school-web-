'use client'
import ShiftForm from "@/modules/lookup/shift/components/shift.form";
import { useParams } from "next/navigation";

export default function ShiftEdit(){
    const params = useParams()
    const id = params.id as string

    return <ShiftForm id={id} />
}