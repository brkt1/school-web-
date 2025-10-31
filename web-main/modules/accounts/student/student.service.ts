import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { Student } from "./student.model";
import { FetchedApi } from "@/utils/common_models/commons.model";
import { ClassRoomShift } from "@/modules/organization/class_room_shift/class_room_shift.model";

const useStudentService = () => {
  const commonApi = useApi('accounts');
  
  return useMemo(() => {
    const getStudent = (id: string) => {
      return commonApi.get<Student>(`students/${id}`);
    };

    const addStudent = (student: Student) => {
      return commonApi.post<Student & {checkout_url: string}>(`students`, student);
    };

    const updateStudent = (id: string, student: Student) => {
      return commonApi.put<Student>(`students/${id}`, student);
    };

    const deleteStudent = (id: string) => {
      return commonApi.delete<Student>(`students/${id}`);
    };

    const getStudents = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<Student>>(`students`, {
        params,
      });
    };

    const getStudentAvailableShifts = (id: string) => {
      return commonApi.get<FetchedApi<ClassRoomShift>>(`students/${id}/available-shifts`);
    };

    return {
      getStudent,
      getStudents,
      addStudent,
      updateStudent,
      deleteStudent,
      getStudentAvailableShifts,
    };
  }, [commonApi]);
};

export default useStudentService;
