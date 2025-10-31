import { toDate } from "@/utils/timeUtils";
import { RadioChangeEvent } from "antd";
import { useState } from "react";

interface DateSearchModel {
    date?: Date
    filterType?: 'date'|'year'|'month'
}

export const useDateFilter = <T extends DateSearchModel>(props?: T) => {
    const [filterType, setFilterType] = useState<'date' | 'month' | 'year'>(props?.filterType || 'date');
    const [date, setDate] = useState<Date>(props?.date || new Date());
    const [filterData, setFilterData] = useState<T | DateSearchModel>({
		...props,
	});
    
    const handleFilterTypeChange = ({ target: { value } }: RadioChangeEvent) => {
        setFilterType(value);
      };

    const handleValueChange = (date: Date) => {
        setDate(date);
        const data = { ...filterData, date } as T;
		setFilterData(data);
    }

    return {
        filterType, date, handleFilterTypeChange, handleValueChange
    }
}