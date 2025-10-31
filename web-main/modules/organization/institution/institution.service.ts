import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { Institution } from "./institution.model";
import { FetchedApi } from "@/utils/common_models/commons.model";
import { Package } from "@/modules/lookup/package/package.model";
import { Days } from "@/modules/accounts/student/student.enum";
import { ClassRoomShift } from "../class_room_shift/class_room_shift.model";

const useInstitutionService = () => {
  const commonApi = useApi('organization');
  
  return useMemo(() => {
    const getInstitution = (id: string) => {
      return commonApi.get<Institution>(`institutions/${id}`);
    };

    const getInstitutionPackages = (id: string,params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<Package>>(`institutions/${id}/packages`, {
        params,
      });
    };

    const getInstitutionPackageDays = (id: string, package_id: string,params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<{label: string, value: number}>>(`institutions/${id}/packages/${package_id}/days`, {
        params,
      });
    };

     const getInstitutionPackageDayTimes = (id: string, package_id: string, days: number, params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<ClassRoomShift>>(`institutions/${id}/packages/${package_id}/days/${days}/times`, {
        params,
      });
    };

    const addInstitution = (institution: Institution) => {
      return commonApi.post<Institution>(`institutions`, institution);
    };

    const updateInstitution = (id: string, institution: Institution) => {
      return commonApi.put<Institution>(`institutions/${id}`, institution);
    };

    const deleteInstitution = (id: string) => {
      return commonApi.delete<Institution>(`institutions/${id}`);
    };

    const getInstitutions = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<Institution>>(`institutions`, {
        params,
      });
    };

    return {
      getInstitution,
      getInstitutionPackages,
      getInstitutionPackageDays,
      getInstitutionPackageDayTimes,
      getInstitutions,
      addInstitution,
      updateInstitution,
      deleteInstitution,
    };
  }, [commonApi]);
};

export default useInstitutionService;
