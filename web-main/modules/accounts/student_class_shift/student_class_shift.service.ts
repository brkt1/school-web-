import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { StudentClassShift } from "./student_class_shift.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useStudentClassShiftService = () => {
  const commonApi = useApi('accounts');
  
  return useMemo(() => {
    const getStudentClassShift = (id: string) => {
      return commonApi.get<StudentClassShift>(`student-class-shifts/${id}`);
    };

    const addStudentClassShift = (studentclassshift: StudentClassShift) => {
      return commonApi.post<StudentClassShift>(`student-class-shifts`, studentclassshift);
    };

    const updateStudentClassShift = (id: string, studentclassshift: StudentClassShift) => {
      return commonApi.put<StudentClassShift>(`student-class-shifts/${id}`, studentclassshift);
    };

    const deleteStudentClassShift = (id: string) => {
      return commonApi.delete<StudentClassShift>(`student-class-shifts/${id}`);
    };

    const getStudentClassShifts = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<StudentClassShift>>(`student-class-shifts`, {
        params,
      });
    };

    return {
      getStudentClassShift,
      getStudentClassShifts,
      addStudentClassShift,
      updateStudentClassShift,
      deleteStudentClassShift,
    };
  }, [commonApi]);
};

export default useStudentClassShiftService;
