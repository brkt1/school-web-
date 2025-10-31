"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd";
import useTeacherService from "../teacher.service";
import { Teacher } from "../teacher.model";

interface SearchInputProps
  extends Omit<SelectProps<number>, "options" | "onSearch"> {
  placeholder?: string;
  detail?: Teacher;
}

const TeacherSearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search Teachers",
  value,
  detail,
  onChange,
  ...restProps
}) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [hasMore, setHasMore] = useState(true);
  const teacherService = useTeacherService();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentPageRef = useRef(1);

  const fetchData = useCallback(
    async (term: string = "", page: number = 1, append: boolean = false) => {
      setLoading(true);
      try {
        const { data: { results, next } } = await teacherService.getTeachers({
          search: term?.trim(),
          ps: 100,
          pn: page,
        });

        const formatted = results?.map((teacher: Teacher) => ({
          value: teacher.id,
              label: teacher.user_detail.full_name,
        }));

        setOptions(prev => {
          if (append) {
            const newOptions = formatted.filter(
              newOpt => !prev?.some(prevOpt => prevOpt.value === newOpt.value)
            );
            return [...(prev || []), ...newOptions];
          }
          return formatted;
        });

        setHasMore(!!next);
      } finally {
        setLoading(false);
      }
    },
    [teacherService]
  );

  // Handle adding detail to options
  useEffect(() => {
    if (detail && value) {
      setOptions(prev => {
        const exists = prev?.some(opt => opt.value === detail.id);
        if (!exists) {
          return [...(prev || []), { value: detail.id, label: detail.user_detail.full_name }];
        }
        return prev;
      });
    }
  }, [detail?.id, detail?.user_detail.full_name, value]);

  const handlePopupScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget;
      const isBottom = scrollTop + offsetHeight === scrollHeight;

      if (isBottom && !loading && hasMore) {
        const nextPage = currentPageRef.current + 1;
        currentPageRef.current = nextPage;
        fetchData(searchTerm || "", nextPage, true);
      }
    },
    [loading, hasMore, searchTerm, fetchData]
  );

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      currentPageRef.current = 1;
      setHasMore(true);
      setOptions([]);
      fetchData(searchTerm || "", 1);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm, fetchData]);

  return (
    <Select
      showSearch
      value={value}
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      suffixIcon={loading ? <Spin size="small" /> : undefined}
      filterOption={false}
      notFoundContent={loading ? <Spin size="small" /> : "No results found"}
      onSearch={handleSearch}
      onPopupScroll={handlePopupScroll}
      onChange={onChange}
      options={options}
      loading={loading}
      {...restProps}
    />
  );
};

export default TeacherSearchInput;
