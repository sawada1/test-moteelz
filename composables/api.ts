import { useRuntimeConfig } from "#app";
import { useFetch } from "#app";
import { ErrorOr } from "@/types/ErrorOr";
// import {useI18n} from "vue-i18n"

export enum Method {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}
// const {locale} = useI18n()
export const useApi = async <T>(
  request: string = "",
  method: Method = Method.GET,
  content?: any,
  query?: Record<string, any>,
  lang: string = "ar",
  customHeaders?: Record<string, string>
): Promise<ErrorOr<T>> => {
  const config = useRuntimeConfig();

  // Token should only be accessed if we are in the client environment
  let token: string | null = null;
  let language: string = lang;
  if (process.client) {
    token = localStorage.getItem("token");
    language = localStorage.getItem("lang") || "ar";
  }

  // Define headers and include Authorization and Language headers
  const headers: Record<string, string> = {
    accept: "application/json",
    "Accept-Language": lang,
    // "x-demo":"true"
  };

  // If content is not FormData, set Content-Type header to JSON
  if (!(content instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Add Authorization token to headers if available
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (customHeaders) {
    Object.assign(headers, customHeaders);
  }

  // Initialize with loading state
  const result = ErrorOr.loading<T>();

  // Remove any token or Authorization fields from `query` to prevent them in URL
  if (query) {
    delete query.token;
    delete query.Authorization;
  }

  return new Promise(async (resolve) => {
    try {
      const { data, error, pending, response } = await useFetch<T>(request, {
        method,
        baseURL: 'https://dev-api-v2.moteelz.com',
        headers,
        query,
        body: content instanceof FormData ? content : JSON.stringify(content),
        ssr: true,
      });

      result.loading = pending.value;

      // Log the complete response for better debugging
      console.log("useFetch response:", { data, error, response, pending });

      // Handle errors with more specific checks
      if (error.value) {
        const statusCode =
          (error.value as any)?.statusCode || response?.status || 500;

        const errorMessage =
          (error.value as any)?.data?.message ||
          (error.value as any)?.message || // Use generic error message if available
          "An unknown error occurred.";

        console.error("useApi error details:", {
          statusCode,
          errorMessage,
          errorValue: error.value,
          response,
        });
        // if (error.value?.data.search_id?.length > 0) {
        //   const new_search = error.value.data.search_id;
        //   console.log(new_search);
        //   localStorage.setItem(
        //     "searchQueryId",
        //     new_search ? JSON.stringify(new_search) : ""
        //   );
        //   return useApi(request, method, content, query, lang, customHeaders);
        // }
        resolve(
          ErrorOr.failure<T>(errorMessage, statusCode, response, error.value)
        );
        return;
      }

      // If data is returned successfully
      if (data.value) {
        resolve(
          ErrorOr.success<T>(data.value, response?.status || 200, response)
        );
        return;
      }

      // Fallback in case neither error nor data are clearly provided
      console.warn("Fallback: No data or error clearly provided by useFetch.");
      resolve(
        ErrorOr.failure<T>("No data received from the server", 500, null)
      );
    } catch (err) {
      console.error("Unexpected error in useApi function:", err);
      resolve(ErrorOr.failure<T>("An unexpected error occurred", 500, null));
    }
  });
};
