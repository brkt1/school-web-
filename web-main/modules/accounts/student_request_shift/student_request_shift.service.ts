import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { StudentRequestShift } from "./student_request_shift.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useStudentRequestShiftService = () => {
  const commonApi = useApi('accounts');
  
  return useMemo(() => {
    const getStudentRequestShift = (id: string) => {
      return commonApi.get<StudentRequestShift>(`student-request-shifts/${id}`);
    };

    const addStudentRequestShift = (studentrequestshift: StudentRequestShift) => {
      return commonApi.post<StudentRequestShift>(`student-request-shifts`, studentrequestshift);
    };

    const updateStudentRequestShift = (id: string, studentrequestshift: StudentRequestShift) => {
      return commonApi.put<StudentRequestShift>(`student-request-shifts/${id}`, studentrequestshift);
    };

    const deleteStudentRequestShift = (id: string) => {
      return commonApi.delete<StudentRequestShift>(`student-request-shifts/${id}`);
    };

    const getStudentRequestShifts = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<StudentRequestShift>>(`student-request-shifts`, {
        params,
      });
    };

    return {
      getStudentRequestShift,
      getStudentRequestShifts,
      addStudentRequestShift,
      updateStudentRequestShift,
      deleteStudentRequestShift,
    };
  }, [commonApi]);
};

export default useStudentRequestShiftService;
