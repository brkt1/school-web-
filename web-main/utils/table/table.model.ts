import { GetProp, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";

export type ColumnsType<T extends object = object> = TableProps<T>["columns"];
export type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

export interface TableParams {
  pagination?: TablePaginationConfig;
  sorter?: SorterResult<any> | SorterResult<any>[];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
  searchText?: string;
}