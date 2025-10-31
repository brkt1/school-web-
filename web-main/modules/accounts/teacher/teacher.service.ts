import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { Teacher } from "./teacher.model";
import { FetchedApi } from "@/utils/common_models/commons.model";
import { ClassRoomShift } from "@/modules/organization/class_room_shift/class_room_shift.model";

const useTeacherService = () => {
  const commonApi = useApi('accounts');
  
  return useMemo(() => {
    const getTeacher = (id: string) => {
      return commonApi.get<Teacher>(`teachers/${id}`);
    };

    const getTeacherAvailableShifts = (id: string) => {
      return commonApi.get<FetchedApi<ClassRoomShift>>(`teachers/${id}/available-shifts`);
    };

    const addTeacher = (teacher: FormData) => {
    return commonApi.post<Teacher & {checkout_url: string}>(`teachers`, teacher, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
  };

    const updateTeacher = (id: string, teacher: FormData) => {
    return commonApi.put<FormData>(`teachers/${id}`, teacher, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
  };

    const deleteTeacher = (id: string) => {
      return commonApi.delete<Teacher>(`teachers/${id}`);
    };
    
    const approveTeacher = (id: string) => {
    return commonApi.post<Teacher>(`teachers/${id}/approve`);
  };

  const rejectTeacher = (id: string) => {
    return commonApi.post<Teacher>(`teachers/${id}/reject`);
  };

    const getTeachers = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<Teacher>>(`teachers`, {
        params,
      });
    };

    return {
      getTeacher,
      getTeachers,
      addTeacher,
      updateTeacher,
      deleteTeacher,
      approveTeacher,
      rejectTeacher,
      getTeacherAvailableShifts,
    };
  }, [commonApi]);
};

export default useTeacherService;
