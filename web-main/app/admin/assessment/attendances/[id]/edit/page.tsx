'use client'
import AttendanceForm from "@/modules/assessment/attendance/components/attendance.form";
import { useParams } from "next/navigation";

export default function AttendanceEdit(){
    const params = useParams()
    const id = params.id as string

    return <AttendanceForm id={id} />
}