'use client'
import ClassRoomForm from "@/modules/organization/class_room/components/class_room.form";
import { useParams } from "next/navigation";

export default function ClassRoomEdit(){
    const params = useParams()
    const institution = params.id as string
    const id = params.class_room_id as string

    return <ClassRoomForm id={id} detail_navigation={`/admin/organization/institutions/${institution}/class_rooms`} />
}