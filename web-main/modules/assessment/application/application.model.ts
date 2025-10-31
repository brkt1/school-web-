import { Teacher } from "@/modules/accounts/teacher/teacher.model";
import { Institution } from "@/modules/organization/institution/institution.model";

export interface Application {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    teacher: string;
    teacher_detail: Teacher;
    status: number;
    submission_date: string | Date;
    application_letter: string;
    institution: string;
    institution_detail: Institution;
    shift: number;
}