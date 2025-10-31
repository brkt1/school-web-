import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { TeacherRequestShift } from "./teacher_request_shift.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useTeacherRequestShiftService = () => {
  const commonApi = useApi('accounts');
  
  return useMemo(() => {
    const getTeacherRequestShift = (id: string) => {
      return commonApi.get<TeacherRequestShift>(`teacher-request-shifts/${id}`);
    };

    const addTeacherRequestShift = (teacherrequestshift: TeacherRequestShift[]) => {
      return commonApi.post<TeacherRequestShift>(`teacher-request-shifts`, teacherrequestshift);
    };

    const updateTeacherRequestShift = (id: string, teacherrequestshift: TeacherRequestShift) => {
      return commonApi.put<TeacherRequestShift>(`teacher-request-shifts/${id}`, teacherrequestshift);
    };

    const deleteTeacherRequestShift = (id: string) => {
      return commonApi.delete<TeacherRequestShift>(`teacher-request-shifts/${id}`);
    };

    const getTeacherRequestShifts = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<TeacherRequestShift>>(`teacher-request-shifts`, {
        params,
      });
    };

    return {
      getTeacherRequestShift,
      getTeacherRequestShifts,
      addTeacherRequestShift,
      updateTeacherRequestShift,
      deleteTeacherRequestShift,
    };
  }, [commonApi]);
};

export default useTeacherRequestShiftService;
