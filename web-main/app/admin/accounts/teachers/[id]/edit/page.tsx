'use client'
import TeacherForm from "@/modules/accounts/teacher/components/teacher.form";
import { useParams } from "next/navigation";

export default function TeacherEdit(){
    const params = useParams()
    const id = params.id as string

    return <TeacherForm id={id} />
}