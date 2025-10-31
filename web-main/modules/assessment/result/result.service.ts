import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { Result } from "./result.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useResultService = () => {
  const commonApi = useApi('assessment');
  
  return useMemo(() => {
    const getResult = (id: string) => {
      return commonApi.get<Result>(`results/${id}`);
    };

    const addResult = (result: Result) => {
      return commonApi.post<Result>(`results`, result);
    };

    const updateResult = (id: string, result: Result) => {
      return commonApi.put<Result>(`results/${id}`, result);
    };

    const deleteResult = (id: string) => {
      return commonApi.delete<Result>(`results/${id}`);
    };

    const getResults = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<Result>>(`results`, {
        params,
      });
    };

    return {
      getResult,
      getResults,
      addResult,
      updateResult,
      deleteResult,
    };
  }, [commonApi]);
};

export default useResultService;
