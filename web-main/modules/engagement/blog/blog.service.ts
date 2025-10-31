import useApi from "@/utils/api/api";
import { Blog } from "./blog.model";
import { FetchedApi } from "@/utils/common_models/commons.model";
import { TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const getBlogsServer = async (params: TableParams) => {
  const requestParams = getRequestParams(params || { pagination: { current: 1, pageSize: 10 } });
  const res = await axios.get<FetchedApi<Blog>>(`${BASE_URL}/engagement/blogs`, {
    params: requestParams,
  });
  return res.data;
};

const useBlogService = () => {
  const commonApi = useApi('engagement');

  const getBlog = (id: string) => {
    return commonApi.get<Blog>(`blogs/${id}`);
  };

  const addBlog = (blog: FormData) => {
    return commonApi.post<Blog>(`blogs`, blog, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
  };

  const updateBlog = (id: string, blog: FormData) => {
    return commonApi.put<Blog>(`blogs/${id}`, blog, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
  };

  const deleteBlog = (id: string) => {
    return commonApi.delete<Blog>(`blogs/${id}`);
  };

  const getBlogs = (params?: Record<string, any>) => {
    return commonApi.get<FetchedApi<Blog>>(`blogs`, {
      params,
    });
  };

  return {
    getBlog,
    getBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
  };
};

export default useBlogService;
