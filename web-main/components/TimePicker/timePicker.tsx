import React from 'react';
import { TimePicker, TimePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

interface TimePickerWrapperProps {
  value?: string;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
}

const TimePickerWrapper: React.FC<TimePickerWrapperProps> = ({
  value,
  onChange,
  placeholder = 'Select Time',
  disabled = false,
  allowClear = true,
}) => {
  // Convert string (e.g., "14:30:00") to dayjs for TimePicker
  const timeValue = value ? dayjs(value, 'HH:mm:ss') : null;

  const handleChange: TimePickerProps['onChange'] = (time: Dayjs | null) => {
    const formatted = time ? time.format('HH:mm:ss') : null;
    onChange?.(formatted);
  };

  return (
    <TimePicker
      use12Hours
      format="hh:mm a"
      value={timeValue}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      allowClear={allowClear}
    />
  );
};

export default TimePickerWrapper;
