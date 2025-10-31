import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { ClassType } from "./class_type.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useClassTypeService = () => {
  const commonApi = useApi('lookup');
  
  return useMemo(() => {
    const getClassType = (id: string) => {
      return commonApi.get<ClassType>(`class-types/${id}`);
    };

    const addClassType = (classtype: ClassType) => {
      return commonApi.post<ClassType>(`class-types`, classtype);
    };

    const updateClassType = (id: string, classtype: ClassType) => {
      return commonApi.put<ClassType>(`class-types/${id}`, classtype);
    };

    const deleteClassType = (id: string) => {
      return commonApi.delete<ClassType>(`class-types/${id}`);
    };

    const getClassTypes = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<ClassType>>(`class-types`, {
        params,
      });
    };

    return {
      getClassType,
      getClassTypes,
      addClassType,
      updateClassType,
      deleteClassType,
    };
  }, [commonApi]);
};

export default useClassTypeService;
