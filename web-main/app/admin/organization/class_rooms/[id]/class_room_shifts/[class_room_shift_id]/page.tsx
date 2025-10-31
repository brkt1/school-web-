'use client'
import ClassRoomShiftDetail from "@/modules/organization/class_room_shift/components/class_room_shift.detail";
import { useParams } from "next/navigation";

export default function ClassRoomShift(){
    const params = useParams()
    const id = params.id as string

    return <ClassRoomShiftDetail id={id} />
}