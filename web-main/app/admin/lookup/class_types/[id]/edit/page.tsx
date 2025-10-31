'use client'
import ClassTypeForm from "@/modules/lookup/class_type/components/class_type.form";
import { useParams } from "next/navigation";

export default function ClassTypeEdit(){
    const params = useParams()
    const id = params.id as string

    return <ClassTypeForm id={id} />
}