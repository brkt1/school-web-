import { useMemo } from "react";
import useApi, { host } from "@/utils/api/api";
import { Payment, PaymentSummary } from "./payment.model";
import { FetchedApi, FetchedApiWithSummary } from "@/utils/common_models/commons.model";

const usePaymentService = () => {
  const commonApi = useApi('finance');
  
  return useMemo(() => {
    const getPayment = (id: string) => {
      return commonApi.get<Payment>(`payments/${id}`);
    };

    const addPayment = (payment: Payment) => {
      return commonApi.post<Payment>(`payments/`, payment);
    };

    const updatePayment = (id: string, payment: Payment) => {
      return commonApi.put<Payment>(`payments/${id}`, payment);
    };

    const deletePayment = (id: string) => {
      return commonApi.delete<Payment>(`payments/${id}`);
    };

    const getPayments = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApiWithSummary<Payment, PaymentSummary>>(`payments/`, {
        params,
      });
    };

    const downloadPaymentsExcel = (params?: Record<string, any>) => {
      const queryParams = { ...params, export: "excel" };
      const queryString = new URLSearchParams(queryParams).toString();
      window.open(`${host}/finance/payments/?${queryString}`, "_blank");
    };

    const retryPayment = (id: string) => {
      return commonApi.post<{checkout_url: string}>(`payments/${id}/retry`, {});
    };

    const getReceipt = (id: string) => {
      return commonApi.get<Blob>(`payments/${id}/receipt`, {
        responseType: 'blob',
      });
    };

    return {
      getPayment,
      getPayments,
      addPayment,
      updatePayment,
      deletePayment,
      retryPayment,
      getReceipt,
      downloadPaymentsExcel,
    };
  }, [commonApi]);
};

export default usePaymentService;
