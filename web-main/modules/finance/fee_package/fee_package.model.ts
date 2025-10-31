import { User } from "@/modules/auth/user/user.model";
import { Level } from "@/modules/lookup/level/level.model";
import { Package } from "@/modules/lookup/package/package.model";

export interface FeePackage {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    created_by: string;
    created_by_detail: User;
    updated_by: string;
    updated_by_detail: User;
    name: string;
    fee: any;
    description: string;
    payment_purpose: number;
    level: string;
    level_detail: Level;
    package: string;
    package_detail: Package;
}