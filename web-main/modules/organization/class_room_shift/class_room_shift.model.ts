import { Package } from "@/modules/lookup/package/package.model";
import { ClassRoom } from "../class_room/class_room.model";
import { Shift } from "@/modules/lookup/shift/shift.model";
import { Days } from "@/modules/accounts/student/student.enum";
import { User } from "@/modules/auth/user/user.model";

export interface ClassRoomShift {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    class_room: string;
    class_room_detail: ClassRoom;
    package: string;
    package_detail: Package;
    shift_times: string;
    shift_times_detail: Shift;
    shift_days: Days
    start_time: any;
    end_time: any;
    created_by: string;
    created_by_detail: User;
    updated_by: string;
    updated_by_detail: User;
}