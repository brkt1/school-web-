import useApi from "@/utils/api/api";
import { FetchedApi } from "@/utils/common_models/commons.model";
import { useMemo } from "react";
import { News } from "./news.model";

import { TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import axios from "axios";

const host = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const getNewsServer = async (params: TableParams) => {
  const requestParams = getRequestParams(params);
  const response = await axios.get<FetchedApi<News>>(`${host}/engagement/news`, {
    params: requestParams,
  });
  return response.data;
};


const useNewsService = () => {
  const commonApi = useApi('engagement');
  
  return useMemo(() => {
    const getNews = (id: string) => {
    return commonApi.get<News>(`news/${id}`);
  };

  const addNews = (news: FormData) => {
    return commonApi.post<News>(`news`, news, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
  };

  const updateNews = (id: string, news: FormData) => {
    return commonApi.put<News>(`news/${id}`, news, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
  };

  const deleteNews = (id: string) => {
    return commonApi.delete<News>(`news/${id}`);
  };

  const getNewss = (params?: Record<string, any>) => {
    return commonApi.get<FetchedApi<News>>(`news`, {
      params,
    });
  };

    return {
      getNews,
      getNewss,
      addNews,
      updateNews,
      deleteNews,
    };
  }, [commonApi]);
};

export default useNewsService;
