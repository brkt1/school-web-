'use client';
import ClassRoomList from "@/modules/organization/class_room/components/class_room.list";
import { useParams } from "next/navigation";

export default function ClassRooms() {
  const params = useParams();
  const institution = params.id as string;
  return (
    <div>
      <h1 className="font-bold text-lg my-2">Classes</h1>
      <ClassRoomList institution={institution} add_navigation={`/admin/organization/institutions/${institution}/class_rooms/create`} edit_navigation={`/admin/organization/institutions/${institution}/class_rooms`} />
    </div>
  );
}
