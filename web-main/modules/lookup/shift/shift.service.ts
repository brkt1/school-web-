import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { Shift } from "./shift.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useShiftService = () => {
  const commonApi = useApi('lookup');
  
  return useMemo(() => {
    const getShift = (id: string) => {
      return commonApi.get<Shift>(`shifts/${id}`);
    };

    const addShift = (shift: Shift) => {
      return commonApi.post<Shift>(`shifts`, shift);
    };

    const updateShift = (id: string, shift: Shift) => {
      return commonApi.put<Shift>(`shifts/${id}`, shift);
    };

    const deleteShift = (id: string) => {
      return commonApi.delete<Shift>(`shifts/${id}`);
    };

    const getShifts = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<Shift>>(`shifts`, {
        params,
      });
    };

    return {
      getShift,
      getShifts,
      addShift,
      updateShift,
      deleteShift,
    };
  }, [commonApi]);
};

export default useShiftService;
