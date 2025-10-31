import useApi from "@/utils/api/api";
import { User } from "./user.model";
import { FetchedApi } from "@/utils/common_models/commons.model";

const useUserService = () => {
  const commonApi = useApi('commons');

  const getUser = (id: string) => {
    const response = commonApi.get<User>(`users/${id}/`);
    return response;
  };

  const addUser = (UserType: User) => {
    const response = commonApi.post<User>("users/", UserType);
    return response;
  };

  const updateUser = (id: string, UserType: FormData) => {
    const response = commonApi.put<User>(`users/${id}/`, UserType, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
    return response;
  };

  const userDetailDo = (id: string, method: string, payload: any) => {
    const response = commonApi.patch<User>(
      `users/${id}/?method=${method}`,
      payload
    );
    return response;
  };

    const getUsers = (params?: Record<string, any>) => {
      return commonApi.get<FetchedApi<User>>("users/", {
        params,
      });
    };

  const deleteUser = (id: string) => {
    const response = commonApi.delete<User>(`users/${id}/`);
    return response;
  };
  return {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    userDetailDo,
  };
};

export default useUserService;
