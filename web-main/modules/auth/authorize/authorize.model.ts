import { CommonModel } from "@/utils/common_models/commons.model";
import { User } from "../user/user.model";

export interface UserRegister {
    username: string,
    email: string,
    date_of_birth: string,
    password1: string,
    password2: string,
    first_name: string,
    middle_name: string,
    last_name: string;
}

export interface AuthUser extends User {
    access_token: string,
    refresh_token: string,
    user: User
}

export interface PasswordChangeType {
	detail(detail: any): unknown;
    new_password1: string;
    new_password2: string;
}

export interface UserActivaion {
    new_password1: string;
    new_password2: string;
    uid: string;
    token: string;
}

export interface RefreshToken {
    access: string,
    refresh : string,
}

export interface ResetPasswordForm {
    password: string,
    confirmPassword: string;
    email: string;
}

export interface Permission {
    content_type__model?: string,
    can_view: boolean,
    can_change: boolean,
    can_create: boolean,
    can_delete: boolean,
    other_action: boolean,
}

export interface VerifyEmail {
    key: string
}

export interface UserLogin {
    username: string,
    email: string,
    password: string;
    language_id?: string;
    date_of_birth?: string | Date
}
