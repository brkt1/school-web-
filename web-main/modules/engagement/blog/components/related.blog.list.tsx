"use client";
import usePaginator from "@/hooks/paginator";
import { Pagination } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import CategoryBlogCard from "./related.blog.card";
import useBlogService from "../blog.service";
import { Blog } from "../blog.model";
import { TableParams } from "@/utils/table/table.model";
import paginator from "@/hooks/paginator";
import { getRequestParams } from "@/utils/table/table.utils";

interface RelatedBlogListProp {
  title?: string;
  isRelatedBlog?: boolean;
  ps?: number;
}

const RelatedBlogList = ({ title, isRelatedBlog, ps }: RelatedBlogListProp) => {
  const blogService = useBlogService();
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
    sorter: [],
  });

  const service = useBlogService();
  const requestParams = useMemo(
    () => getRequestParams({ ...tableParams, searchText }),
    [tableParams, searchText]
  );

  const fetchData = useCallback(() => {
    setLoading(true);
    service
      .getBlogs(requestParams)
      .then((res) => {
        setData(res?.data?.results);
        const newTotal = res?.data?.count;
        setTableParams((prev) => {
          if (prev.pagination?.total === newTotal) return prev;
          return {
            ...prev,
            pagination: { ...prev.pagination, total: newTotal },
          };
        });
      })
      .finally(() => setLoading(false));
  }, [requestParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto border-t-2">
      <h3 className="font-bold mb-5">{title ? title : "Latest Updates"}</h3>
      <div
        className={`flex flex-col gap-2  ${
          isRelatedBlog ? "" : "px-5 sm:mx-20"
        }`}
      >
        {data?.map((blog, index) => (
          <CategoryBlogCard
            key={index}
            blog={blog}
            isRelatedBlog={isRelatedBlog}
          />
        ))}
      </div>
      <div className="flex items-center justify-center mt-4">
        <Pagination {...paginator} />
      </div>
    </div>
  );
};

export default RelatedBlogList;
