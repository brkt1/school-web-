import { ClassType } from "@/modules/lookup/class_type/class_type.model";
import { Institution } from "../institution/institution.model";

export interface ClassRoom {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    name: string;
    institution: string;
    institution_detail: Institution;
    class_type: string;
    class_type_detail: ClassType
}