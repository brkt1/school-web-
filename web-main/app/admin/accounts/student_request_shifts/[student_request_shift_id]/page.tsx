'use client'
import StudentRequestShiftDetail from "@/modules/accounts/student_request_shift/components/student_request_shift.detail";
import { useParams } from "next/navigation";

export default function StudentRequestShift(){
    const params = useParams()
    const id = params.student_request_shift_id as string

    return <StudentRequestShiftDetail id={id} />
}