// // composables/api.ts
// import { useRuntimeConfig, useFetch } from '#app'

// interface FetchOptions {
//   method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
//   headers?: Record<string, string>
//   query?: Record<string, any>
//   body?: Record<string, any>
// }

// export function useApi() {
//   const config = useRuntimeConfig()
//   const { locale } = useI18n()
//   const apiUrl = config.public.apiUrl
//   const getToken = () => localStorage.getItem('token') || ''
//   async function apiFetch<T>(endpoint: string,{ method = 'GET', query, body }: FetchOptions = {}): Promise<T> {
//     try {
//       const { data, error , status } = await useFetch<T>(`${apiUrl}${endpoint}`, {
//         method,
//         headers: {
//             Authorization: `Bearer ${getToken()}`,
//             accept: "application/json",
//             "Accept-Language": locale.value,
//         },
//         query,
//         body: body ? JSON.stringify(body) : undefined,
//       })
//       if (error.value) throw new Error(error.value.message)
//       return data.value as T
//     } catch (err) {
//       console.error('API Error:', err)
//       throw err 
//     }
//   }

//   return {
//     get: <T>(endpoint: string, query?: Record<string, any>) => apiFetch<T>(endpoint, { method: 'GET', query }),
//     post: <T>(endpoint: string, body?: Record<string, any>) => apiFetch<T>(endpoint, { method: 'POST', body }),
//     put: <T>(endpoint: string, body?: Record<string, any>) => apiFetch<T>(endpoint, { method: 'PUT', body }),
//     del: <T>(endpoint: string) => apiFetch<T>(endpoint, { method: 'DELETE' }),
//   }
// }
