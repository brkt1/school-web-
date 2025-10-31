'use client'
import ClassRoomShiftForm from "@/modules/organization/class_room_shift/components/class_room_shift.form";
import { useParams } from "next/navigation";

export default function ClassRoomShiftEdit(){
    const params = useParams()
    const class_rooms = params.id as string
    const id = params.class_room_shift_id as string

    return <ClassRoomShiftForm id={id} detail_navigation={`/admin/organization/class_rooms/${class_rooms}/class_room_shifts`}  />
}