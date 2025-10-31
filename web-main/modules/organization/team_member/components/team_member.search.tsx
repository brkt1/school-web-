"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import useTeamMemberService from "../team_member.service";
import { TeamMember } from "../team_member.model";

let timeout: ReturnType<typeof setTimeout> | null = null;

interface SearchInputProps
  extends Omit<SelectProps<number>, "options" | "onSearch"> {
  placeholder?: string;
  detail?: TeamMember;
}

const TeamMemberSearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  detail,
  onChange,
  ...restProps
}) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const teammemberService = useTeamMemberService();

  const fetchData = useCallback(() => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    const currentSearch = searchTerm;

    const load = () => {
      teammemberService
        .getTeamMembers({ search: currentSearch })
        .then(({ data: { results } }) => {
          if (currentSearch === searchTerm) {
            const formatted = results?.map((teammember: TeamMember) => ({
              value: teammember.id,
              label: teammember.full_name,
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
            return [...prev, { label: detail.full_name, value: detail.id }];
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

export default TeamMemberSearchInput;