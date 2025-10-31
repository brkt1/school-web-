import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { PaymentWebhookEvent } from "./payment_webhook_event.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const usePaymentWebhookEventService = () => {
  const commonApi = useApi('finance');
  
  return useMemo(() => {
    const getPaymentWebhookEvent = (id: string) => {
      return commonApi.get<PaymentWebhookEvent>(`payment-webhook-events/${id}`);
    };

    const addPaymentWebhookEvent = (paymentwebhookevent: PaymentWebhookEvent) => {
      return commonApi.post<PaymentWebhookEvent>(`payment-webhook-events`, paymentwebhookevent);
    };

    const updatePaymentWebhookEvent = (id: string, paymentwebhookevent: PaymentWebhookEvent) => {
      return commonApi.put<PaymentWebhookEvent>(`payment-webhook-events/${id}`, paymentwebhookevent);
    };

    const deletePaymentWebhookEvent = (id: string) => {
      return commonApi.delete<PaymentWebhookEvent>(`payment-webhook-events/${id}`);
    };

    const getPaymentWebhookEvents = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<PaymentWebhookEvent>>(`payment-webhook-events`, {
        params,
      });
    };

    return {
      getPaymentWebhookEvent,
      getPaymentWebhookEvents,
      addPaymentWebhookEvent,
      updatePaymentWebhookEvent,
      deletePaymentWebhookEvent,
    };
  }, [commonApi]);
};

export default usePaymentWebhookEventService;
