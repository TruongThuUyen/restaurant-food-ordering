import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { STORAGE, getLocalStorage, removeLocalStorage } from '@/utils/storage';

const BASE_URL = process.env.BASE_URL;

const getToken = () => {
  const userToken = getLocalStorage(STORAGE.USER_TOKEN);
  return userToken || '';
};

const requestConfig = {
  baseURL: BASE_URL,
  timeout: 10000, // 10s
};

const request = axios.create(requestConfig);

// Request Interceptor
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // Set Headers Here
  // Check Authentication Here
  // Set Loading Start Here

  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // const { method, url } = response.config;
  // const { status } = response;
  // Set Loading End Here
  // Handle Response Data Here
  // Error Handling When Return Success with Error Code Here
  // logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);

  return response.data;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    // console.log('🚀 [API] ERROR: ', { error });
    const { response } = error;
    // const { method, url } = error.config;
    const {
      // statusText,
      status,
      // data,
    } = response ?? {};

    // console.log('======> error', { message, method, url, statusText, status });
    if (status === 401 || status === 403) {
      removeLocalStorage(STORAGE.USER_TOKEN);
    } else {
      // showErrorApi(data);
    }
  } else {
  }

  return Promise.reject(error);
};

request.interceptors.request.use(onRequest, onErrorResponse);
request.interceptors.response.use(onResponse, onErrorResponse);
export default request;
