import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { TeacherShift } from "./teachershift.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useTeacherShiftService = () => {
  const commonApi = useApi('assessment');
  
  return useMemo(() => {
    const getTeacherShift = (id: string) => {
      return commonApi.get<TeacherShift>(`teacher-shifts/${id}`);
    };

    const addTeacherShift = (teachershift: TeacherShift) => {
      return commonApi.post<TeacherShift>(`teacher-shifts`, teachershift);
    };

    const updateTeacherShift = (id: string, teachershift: TeacherShift) => {
      return commonApi.put<TeacherShift>(`teacher-shifts/${id}`, teachershift);
    };

    const deleteTeacherShift = (id: string) => {
      return commonApi.delete<TeacherShift>(`teacher-shifts/${id}`);
    };

    const getTeacherShifts = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<TeacherShift>>(`teacher-shifts`, {
        params,
      });
    };

    return {
      getTeacherShift,
      getTeacherShifts,
      addTeacherShift,
      updateTeacherShift,
      deleteTeacherShift,
    };
  }, [commonApi]);
};

export default useTeacherShiftService;
