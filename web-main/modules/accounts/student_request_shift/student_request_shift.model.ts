import { Package } from "@/modules/lookup/package/package.model";
import { Institution } from "@/modules/organization/institution/institution.model";
import { Student } from "../student/student.model";
import { User } from "@/modules/auth/user/user.model";
import { Shift } from "@/modules/lookup/shift/shift.model";

export interface StudentRequestShift {
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
    fee_package: string;
    fee_package_detail: Package;
    shift_days: number;
    shift_times: string;
    shift_times_detail: Shift;
    start_time: any;
    end_time: any;
    student_request_shifts: StudentRequestShift[]
    shift: string;
}