'use client'
import AttendanceDetail from "@/modules/assessment/attendance/components/attendance.detail";
import { useParams } from "next/navigation";

export default function Attendance(){
    const params = useParams()
    const id = params.id as string

    return <AttendanceDetail id={id} />
}