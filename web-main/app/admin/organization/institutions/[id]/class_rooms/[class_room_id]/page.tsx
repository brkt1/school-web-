'use client'
import ClassRoomDetail from "@/modules/organization/class_room/components/class_room.detail";
import { useParams } from "next/navigation";

export default function ClassRoom(){
    const params = useParams()
    const id = params.id as string

    return <ClassRoomDetail id={id} />
}