import { DefaultOptionType } from "antd/es/select";
import { SortOrder } from "antd/es/table/interface";

export interface FetchedApi<T> {
    data: T[]
    results: T[]
    total_balance: number
    count: number
    next: string
    previous: string  
    response?: any;
  }

export interface FetchedApiWithSummary<T, R> {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: {
    results: T[];
    totals?: R;
    columns?: {title: string, key: string}[]
  };
  data?: T[];
  total_balance?: number;
  response?: any;
}

  export class TCId {
    id?: string ;
  
    constructor(idVal?: string) {
      if (idVal) {
        this.id = idVal;
      }
    }
  }

  export class EnumType {
    id: number | undefined ;
    value?: string | number;
  
    constructor(idVal?: number, value?: string) {
      if (idVal) {
        this.id = idVal;
        this.value = value
      }
    }
  }

  export interface ListData<T> {
    next: string,
    previous: string,
    data: T[]
}


export enum componentType {
	TEXT,
	DROPDOWN,
	DATE,
	SEARCH,
	TOGGLE,
}

export interface CommonModel {
  id: string,
  create_date: Date,
  update_date: Date,
}


export interface FetchedApi<T> {
  data: T[]
  results: T[]
  total_balance: number
  count: number
  next: string
  previous: string  
  response?: any;
}


export interface TableSearchModel<T = any> {
  search?: string
  view_type?: string
  ps?: number
  pn?: number
  id?: string;
  ordering?: {
    so: SortOrder;
    sc: keyof T;
  }
}

export interface CustomSelectProps extends DefaultOptionType {
  data? : any
}

export type BackEndError<T> = {
  [ key in keyof T ]: string[];
} & {
  non_field_errors: string[]
}

export interface Navigations {
  add_navigation?: string;
  detail_navigation?: string
  edit_navigation?: string
  list_navigation?: string
}