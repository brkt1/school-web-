import useApi, { refreshKey } from "@/utils/api/api";
import {
  AuthUser,
  PasswordChangeType,
  RefreshToken,
  UserActivaion,
  UserLogin,
  UserRegister,
  VerifyEmail,
} from "./authorize.model";

const useAuthorizeService = () => {
  const commonApi = useApi('commons');
  const authUser = () => {
      const response = commonApi.get<AuthUser>("authorize/user/");
      return response;
  };

  const logout = () => {
    const refresh = localStorage.getItem(refreshKey);
    const response = commonApi.post("authorize/logout/", {
      refresh,
    });
    return response;
  };

  const register = (user: UserRegister) => {
    const response = commonApi.post<AuthUser>("registration/", {
      ...user,
    });
    return response;
  };

  const accountConfirmEmail = (verifyEmail: VerifyEmail) => {
    const response = commonApi.post<AuthUser>(
      `account-confirm-email/${verifyEmail.key}`,
      {
        ...verifyEmail,
      }
    );
    return response;
  };

  const userRegister = (user: UserRegister) => {
    const response = commonApi.post<AuthUser>("user_registration/", {
      ...user,
    });
    return response;
  };

  const login = (user: UserLogin) => {
    const response = commonApi.post<AuthUser>("authorize/login/", {
      ...user,
    });
    return response;
  };

  const google = (access_token: string) => {
    const response = commonApi.post<AuthUser>("authorize/google/", {
      access_token,
    });
    return response;
  };
  const github = (code: string) => {
    const response = commonApi.post<AuthUser>("authorize/github/", {
      code,
    });
    return response;
  };
  const resetPassword = (email: string) => {
    const response = commonApi.post<any>("authorize/password/reset/", {
      email,
    });
    return response;
  };

  const activateUser = (userActivation: UserActivaion) => {
    const response = commonApi.post<AuthUser>(
      `authorize/password/reset/confirm/${userActivation.uid}/${userActivation.token}/`,
      {
        ...userActivation,
      }
    );
    return response;
  };

  const passwordChange = (passwordChange: PasswordChangeType) => {
    const response = commonApi.post<any>(
      "authorize/password/change/",
      passwordChange
    );
    return response;
  };

  const refreshToken = (refresh: string) => {
    const response = commonApi.post<RefreshToken>("authorize/token/refresh/", {
      refresh,
    });
    return response;
  };

  return {
    refreshToken,
    authUser,
    register,
    login,
    google,
    github,
    resetPassword,
    activateUser,
    logout,
    passwordChange,
    userRegister,
    accountConfirmEmail,
  };
};

export default useAuthorizeService;
