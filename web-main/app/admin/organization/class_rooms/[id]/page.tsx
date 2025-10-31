"use client";
import CitysList from "@/modules/organization/city/components/city.list";
import ClassRoomShiftList from "@/modules/organization/class_room_shift/components/class_room_shift.list";
import { useParams } from "next/navigation";

export default function ClassRoomShift() {
  const params = useParams();
  const class_room = params.id as string;
  return (
    <div>
      <h1 className="font-bold text-lg my-2">Class Room Shifts</h1>
      <ClassRoomShiftList class_room={class_room} add_navigation={`/admin/organization/class_rooms/${class_room}/class_room_shifts/create`} edit_navigation={`/admin/organization/class_rooms/${class_room}/class_room_shifts`} />
    </div>
  );
}
