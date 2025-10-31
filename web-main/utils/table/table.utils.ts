import { TableParams } from "./table.model";

export const getRequestParams = <T extends TableParams>(params: T) => {
  const { pagination, filters, sorter, searchText , ...rest} = params;

  const result: Record<string, any> = {};

  if (pagination?.pageSize) result.ps = pagination.pageSize;
  if (pagination?.current) result.pn = pagination.current;

  // DRF filters (field=value or field__lookup=value)
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value != null && value.length) {
        // Check for date range string (start|end)
        if (typeof value[0] === "string" && value[0].includes("|")) {
          const [start, end] = value[0].split("|");
          result[`${key}__gte`] = start.split("T")[0];
          result[`${key}__lte`] = end.split("T")[0];
        } else if (Array.isArray(value)) {
          result[`${key}__in`] = value;
        } else {
          result[key] = value;
        }
      }
    });
  }

  // DRF SearchFilter
  if (searchText) {
    result.search = searchText;
  }

  // DRF OrderingFilter
  if (Array.isArray(sorter)) {
    const ordering = sorter
      .filter((s) => !!s.order)
      .map((s) => (s.order === "descend" ? `-${s.field}` : s.field));
    if (ordering.length > 0) {
      result.ordering = ordering.join(",");
    }
  } else if (sorter?.field) {
    result.ordering =
      sorter.order === "descend" ? `-${sorter.field}` : sorter.field;
  }

  Object.entries(rest).forEach(([key, value]) => {
    if (value != null) {
      result[key] = value;
    }
  });

  return result;
};
