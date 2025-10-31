'use client'
import TeacherClassShiftDetail from "@/modules/accounts/teacher_class_shift/components/teacher_class_shift.detail";
import { useParams } from "next/navigation";

export default function TeacherClassShift(){
    const params = useParams()
    const id = params.id as string

    return <TeacherClassShiftDetail id={id} />
}