import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { Region } from "./region.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useRegionService = () => {
  const commonApi = useApi('organization');
  
  return useMemo(() => {
    const getRegion = (id: string) => {
      return commonApi.get<Region>(`regions/${id}`);
    };

    const addRegion = (region: Region) => {
      return commonApi.post<Region>(`regions`, region);
    };

    const updateRegion = (id: string, region: Region) => {
      return commonApi.put<Region>(`regions/${id}`, region);
    };

    const deleteRegion = (id: string) => {
      return commonApi.delete<Region>(`regions/${id}`);
    };

    const getRegions = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<Region>>(`regions`, {
        params,
      });
    };

    return {
      getRegion,
      getRegions,
      addRegion,
      updateRegion,
      deleteRegion,
    };
  }, [commonApi]);
};

export default useRegionService;
