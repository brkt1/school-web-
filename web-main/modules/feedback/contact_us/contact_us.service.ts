import { useMemo } from "react";
import useApi from "@/utils/api/api";
import { ContactUs } from "./contact_us.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useContactUsService = () => {
  const commonApi = useApi('commons');
  
  return useMemo(() => {
    const getContactUs = (id: string) => {
      return commonApi.get<ContactUs>(`feedback/contact_us/${id}`);
    };

    const addContactUs = (contactus: ContactUs) => {
      return commonApi.post<ContactUs>(`feedback/contact_us`, contactus);
    };

    const updateContactUs = (id: string, contactus: ContactUs) => {
      return commonApi.put<ContactUs>(`feedback/contact_us/${id}`, contactus);
    };

    const deleteContactUs = (id: string) => {
      return commonApi.delete<ContactUs>(`feedback/contact_us/${id}`);
    };

    const getContactUss = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<ContactUs>>(`feedback/contact_us`, {
        params,
      });
    };

    return {
      getContactUs,
      getContactUss,
      addContactUs,
      updateContactUs,
      deleteContactUs,
    };
  }, [commonApi]);
};

export default useContactUsService;
