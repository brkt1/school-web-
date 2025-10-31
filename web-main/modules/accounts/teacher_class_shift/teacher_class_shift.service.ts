import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { TeacherClassShift } from "./teacher_class_shift.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useTeacherClassShiftService = () => {
  const commonApi = useApi('accounts');
  
  return useMemo(() => {
    const getTeacherClassShift = (id: string) => {
      return commonApi.get<TeacherClassShift>(`teacher-class-shifts/${id}`);
    };

    const addTeacherClassShift = (teacherclassshift: TeacherClassShift) => {
      return commonApi.post<TeacherClassShift>(`teacher-class-shifts`, teacherclassshift);
    };

    const updateTeacherClassShift = (id: string, teacherclassshift: TeacherClassShift) => {
      return commonApi.put<TeacherClassShift>(`teacher-class-shifts/${id}`, teacherclassshift);
    };

    const deleteTeacherClassShift = (id: string) => {
      return commonApi.delete<TeacherClassShift>(`teacher-class-shifts/${id}`);
    };

    const getTeacherClassShifts = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<TeacherClassShift>>(`teacher-class-shifts`, {
        params,
      });
    };

    return {
      getTeacherClassShift,
      getTeacherClassShifts,
      addTeacherClassShift,
      updateTeacherClassShift,
      deleteTeacherClassShift,
    };
  }, [commonApi]);
};

export default useTeacherClassShiftService;
