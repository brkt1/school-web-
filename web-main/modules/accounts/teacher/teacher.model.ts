import { User } from "@/modules/auth/user/user.model";
import { City } from "@/modules/organization/city/city.model";
import { Institution } from "@/modules/organization/institution/institution.model";
import { Region } from "@/modules/organization/region/region.model";
import {Level} from '@/modules/lookup/level/level.model'
import { Payment } from "@/modules/finance/payment/payment.model";

export interface Teacher {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    user: any;
    user_detail: User;
    institution: string;
    institution_detail: Institution;
    level_of_teaching: string;
    level_of_teaching_detail: Level
    region: string;
    region_detail: Region;
    city: string;
    city_detail: City;
    woreda: string;
    cv: any;
    teacher_type: number;
    campus: string;
    date: string | Date;
    tx_ref: string;
    paid: boolean;
    request_status: number
    response_date: string | Date
    response_by: string
    response_by_detail: User
    application_fee: string
    application_fee_detail: Payment;
    vat_reg_no: string;
    vat_reg_date: string | Date;
    tin_no: string;
    checkout_url: string;
    is_client: boolean;
}