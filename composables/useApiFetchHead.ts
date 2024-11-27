import { useNotification } from '@kyvg/vue3-notification'
import { useHead, useServerHead, useServerHeadSafe } from '@unhead/vue'
import {
  useClearErrors,
  useScrollToFirstError,
  useSetErrors
} from '~/composables/validation'

export const useApiFetchHead = (url: string, options?: any) => {
  const { notify } = useNotification()
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL
  const i18n = useI18n()
 
  // @ts-ignore


  
  return useFetch(url, {
     lazy: false,
     server: true,

    onRequest({ options }) {
      if (options.baseURL === '/') options.baseURL = baseURL

      options.method = options.method || 'POST'

      options.headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Accept-Language': i18n.locale.value,

        ...options.headers
      }

      useClearErrors()
    },

    onResponseError({ response }) {
      const { status, _data } = response

   

      if (status === 422) {
        useSetErrors(_data.errors)

        useScrollToFirstError()
      } else if (_data.error) {
        if (typeof _data.error === 'object') {
          if (!_data.error.nline) {
            notify({
              duration: 5000,
              type: _data.error.type,
              title: _data.error.title,
              text: _data.error.desc || null
            })
          }
        } else {
          notify({
            duration: 5000,
            type: 'error',
            title: _data.error
          })
        }
      }
    },

    onResponse({ response }) {
      const { _data } = response

      notify({
        type: 'error',
        title: '_data.message'
      })
      let dateR = response.value.data
      const title = ref(`${dateR.title}`)
      const imageUrl = ref(`${dateR.image.image_url}`)
      const urlUnit = ref(`${baseURL}/units/${dateR.id}-book`)
    //   og:title og:url og:image og:image:url og:image:width og:image:height


    useHead({
        title,
        meta: [
          {
            property: 'og:title',
            content: title
          },
          {
            property: 'og:url',
            content: urlUnit
          },
          {
            property: 'og:image:url',
            content: imageUrl
          },
          {
            property: 'og:image',
            content: imageUrl
          }

        ]

      })


      if (_data.message) {
        if (typeof _data.message === 'object') {
          if (!_data.message.nline) {
            notify({
              duration: 5000,
              type: _data.message.type,
              title: _data.message.title,
              text: _data.message.desc
            })
          }
        } else {
          notify({
            type: response.ok ? 'default' : 'error',
            title: _data.message
          })
        }
      }
    },

    ...options
  })
}
