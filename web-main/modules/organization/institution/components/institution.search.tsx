"use client";

import type { SelectProps } from "antd";
import { Select, Spin } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Institution } from "../institution.model";
import useInstitutionService from "../institution.service";

interface SearchInputProps
  extends Omit<SelectProps<number>, "options" | "onSearch"> {
  placeholder?: string;
  detail?: Institution;
}

const InstitutionSearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search Institutions",
  value,
  detail,
  onChange,
  ...restProps
}) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [hasMore, setHasMore] = useState(true);
  const institutionService = useInstitutionService();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentPageRef = useRef(1);

  const fetchData = useCallback(
    async (term: string = "", page: number = 1, append: boolean = false) => {
      setLoading(true);
      try {
        const { data: { results, next } } = await institutionService.getInstitutions({
          search: term?.trim(),
          ps: 100,
          pn: page,
          ordering: 'name'
        });

        const formatted = results?.map((institution: Institution) => ({
          value: institution.id,
              label: institution.name,
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
      } catch (error: any) {
        // Suppress common API errors - backend issues, missing endpoints, or CORS
        const shouldSuppress = 
          error?.code === 'ECONNREFUSED' || 
          error?.code === 'ERR_NETWORK' ||
          error?.code === 'ERR_BAD_REQUEST' ||
          error?.response?.status === 404 ||
          error?.message?.includes('ECONNREFUSED') ||
          error?.message?.includes('connect') ||
          error?.message?.includes('404') ||
          error?.message?.includes('CORS');
        
        if (!shouldSuppress) {
          console.error("Error fetching institutions:", error);
        }
        // Don't update options on error, keep existing options
        if (!append) {
          setOptions([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [institutionService]
  );

  // Handle adding detail to options
  useEffect(() => {
    if (detail && value) {
      setOptions(prev => {
        const exists = prev?.some(opt => opt.value === detail.id);
        if (!exists) {
          return [...(prev || []), { value: detail.id, label: detail.name }];
        }
        return prev;
      });
    }
  }, [detail?.id, detail?.name, value]);

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

  // Load initial data on mount
  useEffect(() => {
    fetchData("", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      size="large"
      value={value}
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      suffixIcon={loading ? <Spin size="small" /> : undefined}
      filterOption={false}
      notFoundContent={loading ? <Spin size="small" /> : !options || options.length === 0 ? "Start typing to search..." : "No results found"}
      onSearch={handleSearch}
      onPopupScroll={handlePopupScroll}
      onChange={onChange}
      options={options}
      loading={loading}
      allowClear
      {...restProps}
    />
  );
};

export default InstitutionSearchInput;
