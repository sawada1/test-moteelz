import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import { loading } from '@nuxt/ui-templates'
import { POSITION, useToast } from 'vue-toastification'
import { useRuntimeConfig } from "#app";
// const lang = useCookie('lang')
const toast = useToast()


export function useApiAxios<T>(
  method: 'get' | 'put' | 'post' | 'delete',
  url: string,
  data?: any,
  customConfig?: any,
  retries = 3
): Promise<T> {
  const config = useRuntimeConfig();
  const baseURL = 'https://dev-api-v2.moteelz.com';
  const instance: AxiosInstance = axios.create({ baseURL });
  const token = localStorage.getItem("token");
  const language = localStorage.getItem("lang") || "ar";
  instance.interceptors.request.use(
    (config) => {
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'x-accept-language': language === 'en' ? 'en' : 'ar',
      };
      return config;
    },
    (error) => Promise.reject(error)
  );
  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      const { message } = response.data;
      if (message) {
        toast.success(typeof message === 'string' ? message : message.title , {
          timeout: 4000,

        });
      }
      return response;
    },
    async (error: AxiosError): Promise<AxiosError> => {
      const { response, code } = error;
      if (!response || code === 'ECONNABORTED') {
        if (retries > 0) {
          return useApiAxios(method, url, data, customConfig, retries - 1);
        }
        // toast.error('Network error. Please try again.', {
        //   timeout: 4000,
        //   position: POSITION.BOTTOM_CENTER,
        // });
        return Promise.reject(error);
      }
      const { status, data } = response;
      const options = { timeout: 4000, position: POSITION.BOTTOM_CENTER };
      switch (status) {
        case 400:
          // toast.error(data.message, options);
          break;
        case 401:
          // toast.error(data.message || data.error, options);
          break;
        case 422:
          const firstError = data.errors?.[Object.keys(data.errors)[0]]?.[0] || data.message;
          // toast.error(firstError, options);
          break;
        case 503:
          // Maintenance mode logic
          break;
        default:
          const errorMessage = typeof data.error === 'string'
            ? data.error
            : data.error?.title || 'An unknown error occurred. sdfdfsdfsdf';
          // toast.error(errorMessage, options); //this is casing the BIG alert in the bottom of the page I've commented it out until we see how to solve it
          break;
      }
      return Promise.reject(error);
    }
  );
  return instance.request({ method, url, data, ...customConfig }).then((res) => res.data as T);
}

// Now you can use the `instance` for making requests with the defined interceptor.

// Example usage of the Axios instance
// export function axiosApi(url, config: {}) {
//  return    instance.get(url, config).then(res => {
//         return res;
//     }).catch(error => {
//         return Promise.reject(error);
//     });
// }
