import { TableSearchModel } from "@/utils/common_models/commons.model";
import { PaginationProps, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useEffect, useState } from "react";

const usePaginator = <T extends TableSearchModel>(props: T) => {
	const [total, setTotal] = useState<number>(1);
	const [showSizeChanger, setShowSizeChanger] = useState<boolean>(true);
	const [defaultCurrent, setDefaultCurrent] = useState<number>();
	const [pageSizeOptions, setPageSizeOptions] = useState<number[] | string[]>([
		4,5,6, 10, 25, 50,
	]);
	const [defaultPageSize, setDefaultPageSize] = useState<number>(10);
	const [pageSize, setPageSize] = useState(defaultPageSize);
	const [filterData, setFilterData] = useState<T>({
		pn: defaultCurrent,
		ps: defaultPageSize,
		...props,
	});

	const onSortChange: TableProps<any>["onChange"] = (
		pagination,
		filters,
		sorter
	  ) => {
		const sort = sorter as SorterResult<T>
		const data = {...filterData, ordering: {sc: sort.field, so: sort.order}} as T
		setFilterData(data)
	  }

	const onChange: PaginationProps["onShowSizeChange"] = (pn, ps) => {
		const data = { ...filterData, pn, ps } as T;
		setFilterData(data);
	};

	const handleChange = (key: keyof T, value: any) => {
		const data = { ...filterData, [key]: value } as T;
		if (filterData != data){
			setFilterData(data);
		}
	};

	useEffect(() => {
		setPageSize(filterData.ps!);
	}, [filterData]);

	return {
		defaultCurrent,
		pageSizeOptions,
		setPageSizeOptions,
		total,
		showSizeChanger,
		onChange,
		setTotal,
		setShowSizeChanger,
		setDefaultCurrent,
		filterData,
		setFilterData,
		pageSize,
		defaultPageSize,
		setDefaultPageSize,
        handleChange,
		onSortChange
	};
};

export default usePaginator;
