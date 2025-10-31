'use client'
import TeacherShiftForm from "@/modules/assessment/teachershift/components/teachershift.form";
import { useParams } from "next/navigation";

export default function TeacherShiftEdit(){
    const params = useParams()
    const id = params.id as string

    return <TeacherShiftForm id={id} />
}