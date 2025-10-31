import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { Level } from "./level.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useLevelService = () => {
  const commonApi = useApi('lookup');
  
  return useMemo(() => {
    const getLevel = (id: string) => {
      return commonApi.get<Level>(`levels/${id}`);
    };

    const addLevel = (level: Level) => {
      return commonApi.post<Level>(`levels`, level);
    };

    const updateLevel = (id: string, level: Level) => {
      return commonApi.put<Level>(`levels/${id}`, level);
    };

    const deleteLevel = (id: string) => {
      return commonApi.delete<Level>(`levels/${id}`);
    };

    const getLevels = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<Level>>(`levels`, {
        params,
      });
    };

    return {
      getLevel,
      getLevels,
      addLevel,
      updateLevel,
      deleteLevel,
    };
  }, [commonApi]);
};

export default useLevelService;
