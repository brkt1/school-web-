'use client'
import StudentRequestShiftForm from "@/modules/accounts/student_request_shift/components/student_request_shift.form";
import { useParams } from "next/navigation";

export default function StudentRequestShiftEdit(){
    const params = useParams()
    const id = params.student_request_shift_id as string

    return <StudentRequestShiftForm id={id} />
}