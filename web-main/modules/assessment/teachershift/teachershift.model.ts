import { Teacher } from "@/modules/accounts/teacher/teacher.model";
import { ClassRoom } from "@/modules/organization/class_room/class_room.model";

export interface TeacherShift {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    teacher: string;
    teacher_detail: Teacher;
    day: number;
    shift: number;
    class_room: string;
    class_room_detail: ClassRoom;
}