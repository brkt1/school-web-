import { Student } from "@/modules/accounts/student/student.model";
import { Teacher } from "@/modules/accounts/teacher/teacher.model";
import { User } from "@/modules/auth/user/user.model";
import { FeePackage } from "../fee_package/fee_package.model";

export interface Payment {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    student: string;
    student_detail: Student;
    teacher: string;
    teacher_detail: Teacher;
    user: string;
    user_detail: User;
    amount: any;
    date: string | Date;
    payment_date: string | Date;
    redirect_url: string;
    receipt: any;
    ref_number: string;
    status: number;
    payment_for: number;
    invoice_no: string;
    fee_package: string;
    fee_package_detail: FeePackage;
}

export interface PaymentSummary {
  sum_amount?: number;
  sum_tot?: number;
  sum_vat?: number;
  sum_total_amount?: number;
  count?: number;
  [key: string]: number | undefined;
}