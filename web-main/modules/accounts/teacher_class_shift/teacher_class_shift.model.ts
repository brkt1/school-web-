import { ClassRoom } from "@/modules/organization/class_room/class_room.model";
import { ClassRoomShift } from "@/modules/organization/class_room_shift/class_room_shift.model";
import { Institution } from "@/modules/organization/institution/institution.model";
import { Teacher } from "../teacher/teacher.model";
import { TeacherType } from "../student/student.enum";
import { TeacherRequestShift } from "../teacher_request_shift/teacher_request_shift.model";

export interface TeacherClassShift {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    teacher: string;
    teacher_detail: Teacher;
    institution: string;
    institution_detail: Institution;
    teacher_type: TeacherType;
    class_room: string;
    class_room_detail: ClassRoom;
    class_room_shift: string;
    class_room_shift_detail: ClassRoomShift;
    teacher_request_shift: string;
    teacher_request_shift_detail: TeacherRequestShift;
    teacher_class_shifts: TeacherClassShift[]
}