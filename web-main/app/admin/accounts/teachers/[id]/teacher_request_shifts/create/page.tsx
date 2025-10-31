'use client'
import TeacherClassShiftMultipleForm from "@/modules/accounts/teacher_class_shift/components/teacher_class_shift.multiple_form";
import { useParams } from "next/navigation";

export default function TeacherRequestShiftCreate(){
    const params = useParams()
    const id = params.id as string

    return <TeacherClassShiftMultipleForm teacher={id} />
}