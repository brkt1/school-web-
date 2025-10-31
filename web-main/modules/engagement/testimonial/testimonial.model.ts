import { User } from "@/modules/auth/user/user.model";

export interface Testimonial {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    created_by: string;
    created_by_detail: User;
    updated_by: string;
    updated_by_detail: User;
    name: string;
    profile: any;
    job: string;
    review: string;
}