'use client'
import StudentClassShiftDetail from "@/modules/accounts/student_class_shift/components/student_class_shift.detail";
import { useParams } from "next/navigation";

export default function StudentClassShift(){
    const params = useParams()
    const id = params.student_class_shift_id as string

    return <StudentClassShiftDetail id={id} />
}