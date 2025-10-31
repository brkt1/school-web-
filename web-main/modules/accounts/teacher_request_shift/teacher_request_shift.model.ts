import { User } from "@/modules/auth/user/user.model";
import { FeePackage } from "@/modules/finance/fee_package/fee_package.model";
import { Institution } from "@/modules/organization/institution/institution.model";
import { Teacher } from "../teacher/teacher.model";
import { Shift } from "@/modules/lookup/shift/shift.model";
import { TeacherType } from "../student/student.enum";

export interface TeacherRequestShift {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    created_by: string;
    created_by_detail: User;
    updated_by: string;
    updated_by_detail: User;
    teacher: string;
    teacher_detail: Teacher;
    institution: string;
    institution_detail: Institution;
    fee_package: string;
    fee_package_detail: FeePackage;
    teacher_type: TeacherType;
    shift_days: number;
    shift_times: string;
    shift_times_detail: Shift;
    start_time: any;
    end_time: any;
    teacher_request_shifts: TeacherRequestShift[]
    shift: string;
}