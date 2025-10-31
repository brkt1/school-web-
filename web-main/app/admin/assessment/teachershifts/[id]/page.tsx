'use client'
import TeacherShiftDetail from "@/modules/assessment/teachershift/components/teachershift.detail";
import { useParams } from "next/navigation";

export default function TeacherShift(){
    const params = useParams()
    const id = params.id as string

    return <TeacherShiftDetail id={id} />
}