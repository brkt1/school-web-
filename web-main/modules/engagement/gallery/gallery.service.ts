import useApi from "@/utils/api/api";
import { Gallery } from "./gallery.model";
import { FetchedApi } from "@/utils/common_models/commons.model";
import { TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import axios from "axios";

const host = process.env.NEXT_PUBLIC_BASE_URL;

export const getGalleryServer = async (params: TableParams) => {
  const requestParams = getRequestParams(params);
  const res = await axios.get<FetchedApi<Gallery>>(`${host}/engagement/gallerys`, {
    params: requestParams,
  });
  return res.data;
};

const useGalleryService = () => {
  const commonApi = useApi('engagement');

  const getGallery = (id: string) => {
    return commonApi.get<Gallery>(`gallerys/${id}`);
  };

  const addGallery = (gallery: FormData) => {
    return commonApi.post<Gallery>(`gallerys`, gallery, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
  };

  const updateGallery = (id: string, gallery: FormData) => {
    return commonApi.put<Gallery>(`gallerys/${id}`, gallery,{headers: {
      'Content-Type': 'multipart/form-data',
    }});
  };

  const deleteGallery = (id: string) => {
    return commonApi.delete<Gallery>(`gallerys/${id}`);
  };

  const getGallerys = (params?: Record<string, any>) => {
    return commonApi.get<FetchedApi<Gallery>>(`gallerys`, {
      params,
    });
  };

  return {
    getGallery,
    getGallerys,
    addGallery,
    updateGallery,
    deleteGallery,
  };
};

export default useGalleryService;
