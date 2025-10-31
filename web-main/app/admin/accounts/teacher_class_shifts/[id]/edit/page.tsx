'use client'
import TeacherClassShiftForm from "@/modules/accounts/teacher_class_shift/components/teacher_class_shift.form";
import { useParams } from "next/navigation";

export default function TeacherClassShiftEdit(){
    const params = useParams()
    const id = params.id as string

    return <TeacherClassShiftForm id={id} />
}