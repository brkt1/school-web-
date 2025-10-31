import { User } from "@/modules/auth/user/user.model";

export interface Blog {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    created_by: string;
    created_by_detail: User;
    updated_by: string;
    updated_by_detail: User;
    title: string;
    thumbnail: any;
    short_description: string;
    main_content: string;
}