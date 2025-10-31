'use client'
import ClassRoomForm from "@/modules/organization/class_room/components/class_room.form";
import { useParams } from "next/navigation";

export default function ClassRoomEdit(){
    const params = useParams()
    const id = params.id as string

    return <ClassRoomForm id={id} />
}