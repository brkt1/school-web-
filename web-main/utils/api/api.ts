"use client";
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { message } from "antd";
import useHandleError, { ApiErrorModel } from "./handleError";
import { useDispatch } from "react-redux";
import { removeUser } from "@/store/slices/userSlices";
import { RefreshToken } from "@/modules/auth/authorize/authorize.model";
import qs from "qs";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export const host = process.env.NEXT_PUBLIC_BASE_URL;

export const tokenKey = `${host}.token.authorizationData`;
export const refreshKey = `${host}.refresh.authorizationData`;

const useApi = (module: string) => {
  const handleError = useHandleError();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

    const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(tokenKey);
    }
  };

    const requestConfig = (
    api: AxiosInstance,
    config: InternalAxiosRequestConfig
  ) => {
    if (
      config.url?.endsWith("/null") ||
      config.url?.endsWith("/login/") ||
      config.url?.endsWith("/refresh")
    ) {
      return config;
    }
    const token = getToken();
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
    return config;
  };

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: `${host}/${module}`,
      headers: {
        "Content-Type": "application/json",
      },
      paramsSerializer: (params) =>
        qs.stringify(params, {
          arrayFormat: "comma",
          skipNulls: true,
        }),
    });

    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => requestConfig(instance, config),
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      (error) => handleResponseError(error, instance)
    );

    return instance;
  }, [module]); // only recreate when `module` changes


  const addRefreshToken = async (error: AxiosError, cb: Function) => {
    const config = error.config;

    try {
      let res = await refresh_token();
      if (res === false) {
        if (pathname?.startsWith("/admin") || pathname?.startsWith("/student") || pathname?.startsWith("/teacher")) {
          dispatch(removeUser());
          router.push("/login");
        }
        return false;
      }
      if (res?.data.access && typeof window !== "undefined") {
        localStorage.setItem(tokenKey, res.data.access);
        localStorage.setItem(refreshKey, res.data.refresh);
        if (config) {
          config.headers.Authorization = `Bearer ${res.data.access}`;
        }
        return cb(config);
      }
    } catch (err) {
      const errors = err as AxiosError;
      const status = errors.response?.status;
      if (status === 400 || (status === 401 && typeof window !== "undefined")) {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(refreshKey);
        return cb(config);
      }
      return Promise.reject(err);
    }
  };

  const refresh_token = async () => {
    if (typeof window !== "undefined") {
      const refresh = localStorage.getItem(refreshKey);
      if (!refresh) return false;
      return await axios.post<RefreshToken>(`${host}/commons/authorize/token/refresh/`, {
        refresh,
      });
    }
  };

  const handleResponseError = (
    error: AxiosError<ApiErrorModel>,
    cb: Function
  ) => {
    const status = error.response?.status;
    if (status === undefined) {
      message.error("Connection Failed. Please Try again");
    }

    switch (status) {
      case 400:
        handleError.notifyError(error);
        break;
      case 401:
        return addRefreshToken(error, cb);
      case 403:
        message.error(error.response?.data.error.details.detail);
        break;
      case 404:
        message.error("Resource Not found " + error.response?.config.url);
        break;
      case 500:
        message.error("Error Occurred");
        break;
      case 503:
        message.error("Unable to contact remote server. Check your connection.");
        break;
      default:
        break;
    }
    return Promise.reject(error);
  };

  return api;
};

export default useApi;
