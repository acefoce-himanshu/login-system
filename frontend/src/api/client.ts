import axios, { AxiosError, AxiosResponse } from "axios";

const client = axios.create({
  baseURL: "/api",
});

export class ApiError extends Error {
  meta: object;
  constructor(message: string, meta: object) {
    super(message);
    this.name = "ApiError";
    this.meta = meta;
  }
}

export const commonResponseInterceptor = (response: AxiosResponse) => {
  const data = response.data as ApiResponse;
  if (data?.isSuccess && !data?.error) return response;
  let message = "Something went wrong";
  message = data?.error || message;
  throw new ApiError(message, data);
};

export const commonErrorAuthInterceptor = (error: AxiosError) => {
  const status = error.response?.status;
  if (status === 401) {
    window.location.href = "/login";
  }
  throw new Error(error.message);
};

client.interceptors.response.use(
  commonResponseInterceptor,
  commonErrorAuthInterceptor
);

export default client;

export type ApiResponse<T = object> = T & {
  isSuccess: boolean;
  error?: string;
};
