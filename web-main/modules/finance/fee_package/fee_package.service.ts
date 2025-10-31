import useApi from "@/utils/api/api";
import { FeePackage } from "./fee_package.model";
import { FetchedApi } from "@/utils/common_models/commons.model";
import { TableParams } from "@/utils/table/table.model";
import { getRequestParams } from "@/utils/table/table.utils";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const getFeePackagesServer = async (params: TableParams) => {
  const requestParams = getRequestParams(params);
  const res = await axios.get<FetchedApi<FeePackage>>(`${BASE_URL}/finance/fee-packages`, {
    params: requestParams,
  });
  return res.data;
};

const useFeePackageService = () => {
  const commonApi = useApi('finance');

  const getFeePackage = (id: string) => {
    return commonApi.get<FeePackage>(`fee-packages/${id}`);
  };

  const addFeePackage = (feepackage: FeePackage) => {
    return commonApi.post<FeePackage>(`fee-packages`, feepackage);
  };

  const updateFeePackage = (id: string, feepackage: FeePackage) => {
    return commonApi.put<FeePackage>(`fee-packages/${id}`, feepackage);
  };

  const deleteFeePackage = (id: string) => {
    return commonApi.delete<FeePackage>(`fee-packages/${id}`);
  };

  const getFeePackages = (params?: Record<string, any>) => {
    return commonApi.get<FetchedApi<FeePackage>>(`fee-packages`, {
      params,
    });
  };

  return {
    getFeePackage,
    getFeePackages,
    addFeePackage,
    updateFeePackage,
    deleteFeePackage,
  };
};

export default useFeePackageService;
