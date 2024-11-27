import { ref, watch } from 'vue'
import { type UseFetchOptions } from 'nuxt/app'
import { useNotification } from '@kyvg/vue3-notification'

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  let headers: any = {}
  const { notify } = useNotification()
  const config = useRuntimeConfig()
  const XSRF = useCookie('XSRF-TOKEN')
  const baseURL = config.public.baseURL
  const token = ref(useCookie('token').value)  // Use a reactive reference for the token
  const { $i18n } = useNuxtApp()
  headers['Content-Type'] = 'application/json'
  headers['X-Requested-With'] = 'XMLHttpRequest'
  headers['X-Accept-Language'] = $i18n.locale.value as string
  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(['referrer', 'cookie'])
    }
  }

  if (XSRF.value) {
    headers['X-XSRF-TOKEN'] = XSRF.value as string
  }

  // Set the Authorization header only if the token is present
  if (token.value) {
    headers['Authorization'] = 'Bearer ' + token.value
  }

  // Watch for changes to the token and update the headers accordingly
  watch(() => useCookie('token').value, (newToken) => {
    token.value = newToken
    if (newToken) {
      headers['Authorization'] = 'Bearer ' + newToken
    } else {
      delete headers['Authorization']
    }
  })

  return useFetch(`${baseURL + path}`, {
    credentials: 'include',
    method: 'POST',
    watch: false,

    ...options,
    headers: {
      ...headers,
      ...options?.headers
    }
  })
}