import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { Application } from "./application.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useApplicationService = () => {
  const commonApi = useApi('assessment');
  
  return useMemo(() => {
    const getApplication = (id: string) => {
      return commonApi.get<Application>(`applications/${id}`);
    };

    const addApplication = (application: Application) => {
      return commonApi.post<Application>(`applications`, application);
    };

    const updateApplication = (id: string, application: Application) => {
      return commonApi.put<Application>(`applications/${id}`, application);
    };

    const deleteApplication = (id: string) => {
      return commonApi.delete<Application>(`applications/${id}`);
    };

    const getApplications = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<Application>>(`applications`, {
        params,
      });
    };

    return {
      getApplication,
      getApplications,
      addApplication,
      updateApplication,
      deleteApplication,
    };
  }, [commonApi]);
};

export default useApplicationService;
