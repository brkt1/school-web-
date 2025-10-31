"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import useUserService from "../user.service";
import { User } from "../user.model";

let timeout: ReturnType<typeof setTimeout> | null = null;

interface SearchInputProps
  extends Omit<SelectProps<number>, "options" | "onSearch"> {
  placeholder?: string;
  detail?: User;
}

const UserSearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  detail,
  onChange,
  ...restProps
}) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const userService = useUserService();

  // Load search results
  const fetchData = useCallback(() => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    const currentSearch = searchTerm;

    const load = () => {
      userService
        .getUsers({ search: currentSearch })
        .then(({ data: { results } }) => {
          if (currentSearch === searchTerm) {
            const formatted = results?.map((user: User) => ({
              value: user.id,
              label: user.username,
            }));
            setOptions(formatted);
          }
        });
    };

    timeout = setTimeout(load, 300);
  }, [searchTerm]);

  // Prefill options when "detail" is provided (i.e., when value exists but isn't in options yet)
  useEffect(() => {
    if (detail && value) {
      setOptions((prev) => {
        if (prev) {
          const alreadyIncluded = prev.some((opt) => opt.value === detail.id);
          if (!alreadyIncluded) {
            return [...prev, { label: detail.username, value: detail.id }];
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

export default UserSearchInput;
