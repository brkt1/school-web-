import { Student } from "@/modules/accounts/student/student.model";

export interface Attendance {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    student: string;
    student_detail: Student;
    present: boolean;
    date: string | Date;
}