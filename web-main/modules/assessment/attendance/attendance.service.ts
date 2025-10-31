import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { Attendance } from "./attendance.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useAttendanceService = () => {
  const commonApi = useApi('assessment');
  
  return useMemo(() => {
    const getAttendance = (id: string) => {
      return commonApi.get<Attendance>(`attendances/${id}`);
    };

    const addAttendance = (attendance: Attendance) => {
      return commonApi.post<Attendance>(`attendances`, attendance);
    };

    const updateAttendance = (id: string, attendance: Attendance) => {
      return commonApi.put<Attendance>(`attendances/${id}`, attendance);
    };

    const deleteAttendance = (id: string) => {
      return commonApi.delete<Attendance>(`attendances/${id}`);
    };

    const getAttendances = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<Attendance>>(`attendances`, {
        params,
      });
    };

    return {
      getAttendance,
      getAttendances,
      addAttendance,
      updateAttendance,
      deleteAttendance,
    };
  }, [commonApi]);
};

export default useAttendanceService;
