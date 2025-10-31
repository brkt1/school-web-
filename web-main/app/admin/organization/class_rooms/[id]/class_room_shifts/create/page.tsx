'use client';
import ClassRoomShiftForm from "@/modules/organization/class_room_shift/components/class_room_shift.form";
import { useParams } from "next/navigation";

export default function ClassRoomShiftCreate(){
    const params = useParams();
    const class_room = params.id as string;
    return <ClassRoomShiftForm class_room={class_room}  list_navigation={`/admin/organization/class_rooms/${class_room}/class_room_shifts`} />
}