import axios from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    request<t = any>(config: AxiosRequestConfig): Promise<[t, AxiosError]>;
    get<t = any>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<[t, AxiosError]>;
    delete<t = any>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<[t, AxiosError]>;
    head<t = any>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<[t, AxiosError]>;
    post<t = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<[t, AxiosError]>;
    put<t = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<[t, AxiosError]>;
    patch<t = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<[t, AxiosError]>;
  }
}

export const api = axios.create({
  baseURL: 'http://localhost:3333'
});
