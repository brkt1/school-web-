import useApi from "@/utils/api/api";
import { Testimonial } from "./testimonial.model";
import { FetchedApi } from "@/utils/common_models/commons.model";
import { TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const getTestimonialsServer = async (params: TableParams) => {
  const requestParams = getRequestParams(params);
  const res = await axios.get<FetchedApi<Testimonial>>(`${BASE_URL}/engagement/testimonials`, {
    params: requestParams,
  });
  return res.data;
};

const useTestimonialService = () => {
  const commonApi = useApi('engagement');

  const getTestimonial = (id: string) => {
    return commonApi.get<Testimonial>(`testimonials/${id}`);
  };

  const addTestimonial = (testimonial: FormData) => {
    return commonApi.post<Testimonial>(`testimonials`, testimonial, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
  };

  const updateTestimonial = (id: string, testimonial: FormData) => {
    return commonApi.put<Testimonial>(`testimonials/${id}`, testimonial, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
  };

  const deleteTestimonial = (id: string) => {
    return commonApi.delete<Testimonial>(`testimonials/${id}`);
  };

  const getTestimonials = (params?: Record<string, any>) => {
    return commonApi.get<FetchedApi<Testimonial>>(`testimonials`, {
      params,
    });
  };

  return {
    getTestimonial,
    getTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
};

export default useTestimonialService;
