'use client'
import TeacherRequestShiftForm from "@/modules/accounts/teacher_request_shift/components/teacher_request_shift.form";
import { useParams } from "next/navigation";

export default function TeacherRequestShiftEdit(){
    const params = useParams()
    const id = params.teacher_request_shift_id as string

    return <TeacherRequestShiftForm id={id} />
}