import { Level } from "@/modules/lookup/level/level.model";
import { City } from "../city/city.model";
import { Region } from "../region/region.model";

export interface Institution {
    id: any;
    create_date: string | Date;
    update_date: string | Date;
    name: string;
    level: string;
    level_detail: Level[];
    region: string;
    region_detail: Region;
    city: string;
    city_detail: City;
    woreda: string;
}