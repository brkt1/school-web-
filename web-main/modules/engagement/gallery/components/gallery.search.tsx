"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import useGalleryService from "../gallery.service";
import { Gallery } from "../gallery.model";

let timeout: ReturnType<typeof setTimeout> | null = null;

interface SearchInputProps
  extends Omit<SelectProps<number>, "options" | "onSearch"> {
  placeholder?: string;
  detail?: Gallery;
}

const GallerySearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  detail,
  onChange,
  ...restProps
}) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const galleryService = useGalleryService();

  const fetchData = useCallback(() => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    const currentSearch = searchTerm;

    const load = () => {
      galleryService
        .getGallerys({ search: currentSearch })
        .then(({ data: { results } }) => {
          if (currentSearch === searchTerm) {
            const formatted = results?.map((gallery: Gallery) => ({
              value: gallery.id,
              label: gallery.title,
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
            return [...prev, { label: detail.title, value: detail.id }];
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

export default GallerySearchInput;