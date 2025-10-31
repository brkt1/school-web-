import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { ClassRoomShift } from "./class_room_shift.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useClassRoomShiftService = () => {
  const commonApi = useApi('organization');
  
  return useMemo(() => {
    const getClassRoomShift = (id: string) => {
      return commonApi.get<ClassRoomShift>(`class-room-shifts/${id}`);
    };

    const addClassRoomShift = (classroomshift: ClassRoomShift) => {
      return commonApi.post<ClassRoomShift>(`class-room-shifts`, classroomshift);
    };

    const updateClassRoomShift = (id: string, classroomshift: ClassRoomShift) => {
      return commonApi.put<ClassRoomShift>(`class-room-shifts/${id}`, classroomshift);
    };

    const deleteClassRoomShift = (id: string) => {
      return commonApi.delete<ClassRoomShift>(`class-room-shifts/${id}`);
    };

    const getClassRoomShifts = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<ClassRoomShift>>(`class-room-shifts`, {
        params,
      });
    };

    return {
      getClassRoomShift,
      getClassRoomShifts,
      addClassRoomShift,
      updateClassRoomShift,
      deleteClassRoomShift,
    };
  }, [commonApi]);
};

export default useClassRoomShiftService;
