'use client'
import ClassRoomShiftForm from "@/modules/organization/class_room_shift/components/class_room_shift.form";
import { useParams } from "next/navigation";

export default function ClassRoomShiftEdit(){
    const params = useParams()
    const id = params.id as string

    return <ClassRoomShiftForm id={id} />
}