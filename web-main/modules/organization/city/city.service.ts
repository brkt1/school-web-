import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { City } from "./city.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useCityService = () => {
  const commonApi = useApi('organization');
  
  return useMemo(() => {
    const getCity = (id: string) => {
    return commonApi.get<City>(`cities/${id}`);
  };

  const addCity = (city: City) => {
    return commonApi.post<City>(`cities`, city);
  };

  const updateCity = (id: string, city: City) => {
    return commonApi.put<City>(`cities/${id}`, city);
  };

  const deleteCity = (id: string) => {
    return commonApi.delete<City>(`cities/${id}`);
  };

  const getCitys = (params?: Record<string, any>) => {
    return commonApi.get<FetchedApi<City>>(`cities`, {
      params,
    });
  };

    return {
      getCity,
      getCitys,
      addCity,
      updateCity,
      deleteCity,
    };
  }, [commonApi]);
};

export default useCityService;
