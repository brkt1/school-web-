'use client';
import ClassRoomForm from "@/modules/organization/class_room/components/class_room.form";
import { useParams } from "next/navigation";

export default function ClassRoomCreate(){
    const params = useParams();
    const institution = params.id as string;
    return <ClassRoomForm institution={institution}  list_navigation={`/admin/organization/institutions/${institution}/class_rooms`} />
}