'use client'
import StudentForm from "@/modules/accounts/student/components/student.form";
import { useParams } from "next/navigation";

export default function StudentEdit(){
    const params = useParams()
    const id = params.id as string

    return <StudentForm id={id} />
}