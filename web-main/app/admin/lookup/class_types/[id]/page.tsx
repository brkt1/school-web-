'use client'
import ClassTypeDetail from "@/modules/lookup/class_type/components/class_type.detail";
import { useParams } from "next/navigation";

export default function ClassType(){
    const params = useParams()
    const id = params.id as string

    return <ClassTypeDetail id={id} />
}