'use client'
import StudentClassShiftForm from "@/modules/accounts/student_class_shift/components/student_class_shift.form";
import { useParams } from "next/navigation";

export default function StudentClassShiftEdit(){
    const params = useParams()
    const id = params.student_class_shift_id as string

    return <StudentClassShiftForm id={id} />
}