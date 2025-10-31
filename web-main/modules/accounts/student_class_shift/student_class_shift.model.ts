import { User } from "@/modules/auth/user/user.model";
import { ClassRoom } from "@/modules/organization/class_room/class_room.model";
import { ClassRoomShift } from "@/modules/organization/class_room_shift/class_room_shift.model";
import { Institution } from "@/modules/organization/institution/institution.model";
import { Student } from "../student/student.model";
import { StudentRequestShift } from "../student_request_shift/student_request_shift.model";

export interface StudentClassShift {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    created_by: string;
    created_by_detail: User;
    updated_by: string;
    updated_by_detail: User;
    student: string;
    student_detail: Student;
    institution: string;
    institution_detail: Institution;
    class_room: string;
    class_room_detail: ClassRoom;
    class_room_shift: string;
    class_room_shift_detail: ClassRoomShift;
    student_request_class_shift: string;
    student_request_class_shift_detail: StudentRequestShift
    status: number;
}