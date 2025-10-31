import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';

const { TextArea } = Input;

interface DebouncedTextAreaProps extends TextAreaProps {
  delay?: number;
  delayChange: (value: string) => void;
}

const DebouncedTextArea: React.FC<DebouncedTextAreaProps> = ({ value, delayChange, delay = 500, ...props }) => {
  const [internalValue, setInternalValue] = useState<any>(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (internalValue !== value) {
        delayChange(internalValue || '');
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [internalValue, delay, delayChange, value]);

  return (
    <TextArea
      {...props}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
    />
  );
};

export default DebouncedTextArea;
