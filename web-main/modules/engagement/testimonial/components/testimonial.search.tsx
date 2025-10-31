"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import useTestimonialService from "../testimonial.service";
import { Testimonial } from "../testimonial.model";

let timeout: ReturnType<typeof setTimeout> | null = null;

interface SearchInputProps
  extends Omit<SelectProps<number>, "options" | "onSearch"> {
  placeholder?: string;
  detail?: Testimonial;
}

const TestimonialSearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  detail,
  onChange,
  ...restProps
}) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const testimonialService = useTestimonialService();

  const fetchData = useCallback(() => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    const currentSearch = searchTerm;

    const load = () => {
      testimonialService
        .getTestimonials({ search: currentSearch })
        .then(({ data: { results } }) => {
          if (currentSearch === searchTerm) {
            const formatted = results?.map((testimonial: Testimonial) => ({
              value: testimonial.id,
              label: testimonial.name,
            }));
            setOptions(formatted);
          }
        });
    };

      timeout = setTimeout(load, 300);
  }, [searchTerm]);

  useEffect(() => {
    if (detail && value) {
      setOptions((prev) => {
        if (prev) {
          const alreadyIncluded = prev.some((opt) => opt.value === detail.id);
          if (!alreadyIncluded) {
            return [...prev, { label: detail.name, value: detail.id }];
          }
        }
        return prev;
      });
    }
  }, [detail, value]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Select
      showSearch
      value={value}
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      notFoundContent={null}
      onSearch={setSearchTerm}
      onChange={onChange}
      options={options}
      {...restProps}
    />
  );
};

export default TestimonialSearchInput;