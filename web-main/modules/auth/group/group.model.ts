import { CommonModel, TableSearchModel } from "@/utils/common_models/commons.model";

export interface Group extends CommonModel {
    name: string;
    no_of_users: number;
}

export interface GroupSearch extends TableSearchModel {}