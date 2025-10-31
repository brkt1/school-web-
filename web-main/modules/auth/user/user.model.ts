import { PhoneNumber } from "antd-phone-input/types";
import { Permission } from "../authorize/authorize.model";
import { Group } from "../group/group.model";

export interface ConvertedUserPermission {
  [url: string]: Permission
}

export interface User {
    email: string,
    first_name: string,
    middle_name:string,
    last_name: string,
    pk: string,
    username: string;
    is_superuser: boolean;
    date_of_birth: string | Date;
    date_joined: string | Date;
    id: string;
    is_active: boolean;
    profile_pic: string;
    isMobile: boolean
    language_id: string
    last_login: string | Date
    is_staff: boolean;
    phone_number: string | PhoneNumber;
    gender: number;
    full_name: string;
    user_permission: Permission[]
    groups: Group[]
    converted_user_permission: ConvertedUserPermission
    user_type: number
}



