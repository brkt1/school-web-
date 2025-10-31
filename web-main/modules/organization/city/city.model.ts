import { Region } from "../region/region.model";

export interface City {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    name: string;
    region: string;
    region_detail: Region;
}