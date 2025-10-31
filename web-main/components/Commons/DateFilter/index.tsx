import { DatePicker, DatePickerProps, Radio, RadioChangeEvent } from "antd";
import { useState } from "react";

interface DateFilterProps {
  filterType: 'date'|'year'|'month'
  handleFilterTypeChange: (value: RadioChangeEvent) => void
  handleValueChange: (value: any) => void
}

const options = [
  { label: 'Daily', value: 'date' },
  { label: 'Monthly', value: 'month' },
  { label: 'Yearly', value: 'year' },
];

const DateFilter = (props: DateFilterProps) => {

  return <div className="flex gap-2 items-start sm:items-center  flex-col sm:flex-row self-end">
    <Radio.Group
      options={options}
      onChange={props.handleFilterTypeChange}
      value={props.filterType}
      optionType="button"
      buttonStyle="solid"
    />
    <DatePicker picker={props.filterType} className="w-full sm:w-fit" onChange={props.handleValueChange} />
  </div>
}

export default DateFilter;