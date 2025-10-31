"use client";
import usePaginator from "@/hooks/paginator";
import { Pagination } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import CategoryNewsCard from "./related.news.card";
import useNewsService from "../news.service";
import { News } from "../news.model";
import { TableParams } from "@/utils/table/table.model";
import paginator from "@/hooks/paginator";
import { getRequestParams } from "@/utils/table/table.utils";

interface RelatedNewsListProp {
  title?: string;
  isRelatedNews?: boolean;
  ps?: number;
}

const RelatedNewsList = ({ title, isRelatedNews, ps }: RelatedNewsListProp) => {
  const newsService = useNewsService();
  const [data, setData] = useState<News[]>([]);
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

  const service = useNewsService();
  const requestParams = useMemo(
    () => getRequestParams({ ...tableParams, searchText }),
    [tableParams, searchText]
  );

  const fetchData = useCallback(() => {
    setLoading(true);
    service
      .getNewss(requestParams)
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
          isRelatedNews ? "" : "px-5 sm:mx-20"
        }`}
      >
        {data?.map((news, index) => (
          <CategoryNewsCard
            key={index}
            news={news}
            isRelatedNews={isRelatedNews}
          />
        ))}
      </div>
      <div className="flex items-center justify-center mt-4">
        <Pagination {...paginator} />
      </div>
    </div>
  );
};

export default RelatedNewsList;
