import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { Package } from "./package.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const usePackageService = () => {
  const commonApi = useApi('lookup');
  
  return useMemo(() => {
    const getPackage = (id: string) => {
      return commonApi.get<Package>(`packages/${id}`);
    };

    const addPackage = (feePackage: Package) => {
      return commonApi.post<Package>(`packages`, feePackage);
    };

    const updatePackage = (id: string, feePackage: Package) => {
      return commonApi.put<Package>(`packages/${id}`, feePackage);
    };

    const deletePackage = (id: string) => {
      return commonApi.delete<Package>(`packages/${id}`);
    };

    const getPackages = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<Package>>(`packages`, {
        params,
      });
    };

    return {
      getPackage,
      getPackages,
      addPackage,
      updatePackage,
      deletePackage,
    };
  }, [commonApi]);
};

export default usePackageService;
