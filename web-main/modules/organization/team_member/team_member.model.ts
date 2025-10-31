import { User } from "@/modules/auth/user/user.model";

export interface TeamMember {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    created_by: string;
    created_by_detail: User;
    updated_by: string;
    updated_by_detail: User;
    full_name: string;
    facebook_link: string;
    twitter_link: string;
    linkedin_link: string;
    description: string;
    profile: any;
    position: string;
}