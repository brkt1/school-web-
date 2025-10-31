import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { ClassRoom } from "./class_room.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useClassRoomService = () => {
  const commonApi = useApi('organization');
  
  return useMemo(() => {
    const getClassRoom = (id: string) => {
    return commonApi.get<ClassRoom>(`organization_classes/${id}`);
  };

  const addClassRoom = (classroom: ClassRoom) => {
    return commonApi.post<ClassRoom>(`organization_classes`, classroom);
  };

  const updateClassRoom = (id: string, classroom: ClassRoom) => {
    return commonApi.put<ClassRoom>(`organization_classes/${id}`, classroom);
  };

  const deleteClassRoom = (id: string) => {
    return commonApi.delete<ClassRoom>(`organization_classes/${id}`);
  };

  const getClassRooms = (params?: Record<string, any>) => {
    return commonApi.get<FetchedApi<ClassRoom>>(`organization_classes`, {
      params,
    });
  };

    return {
      getClassRoom,
      getClassRooms,
      addClassRoom,
      updateClassRoom,
      deleteClassRoom,
    };
  }, [commonApi]);
};

export default useClassRoomService;
