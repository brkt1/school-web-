import { User } from "@/modules/auth/user/user.model";
import { City } from "@/modules/organization/city/city.model";
import { Institution } from "@/modules/organization/institution/institution.model";
import { ClassRoom } from "@/modules/organization/class_room/class_room.model";
import { Region } from "@/modules/organization/region/region.model";
import { Level } from "@/modules/lookup/level/level.model";
import { StudentRequestShift } from "../student_request_shift/student_request_shift.model";

export interface Student {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    user: any;
    user_detail: User;
    grade: string;
    region: string;
    region_detail: Region;
    city: string;
    city_detail: City;
    woreda: string;
    parents_phonenumber: string;
    student_type: number;
    institution: string;
    institution_detail: Institution;
    date: string | Date;
    shift1: number;
    shift2: number;
    payment_status: number;
    class_level: string;
    class_level_detail: Level;
    class_room_1: string;
    class_room_1_detail: ClassRoom;
    class_room_2: string;
    class_room_2_detail: ClassRoom;
    date_1: string | Date;
    date_2: string | Date;
    day_1: number;
    day_2: number;
    student_request_shifts: StudentRequestShift[]
    vat_reg_no: string;
    vat_reg_date: string | Date;
    tin_no: string;
    checkout_url: string;
    is_client: boolean;
}