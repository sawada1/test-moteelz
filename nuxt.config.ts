// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  plugins: [
    "~/plugins/auth.client.ts", // Register the auth plugin
    "~/plugins/nprogress.js",
    // "~/plugins/pagination.ts",
  ],

  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "@vee-validate/nuxt",
    "nuxt-swiper",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "nuxt-aos",
  ],
  aos: {
    // Initialize AOS
    once: true, // Animation happens only once
  },
  // ssr:false,
  // pinia: {
  //   autoImports: ['defineStore', 'acceptHMRUpdate'], // Optional: Auto-import helpers
  // },

  i18n: {
    langDir: "locales",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "preferredLang",
      redirectOn: "root",
    },
    defaultLocale: "ar",
    fallbackLocale: "ar",
    locales: [
      {
        code: "en",
        dir: "ltr",
        name: "English",
        file: "en.js",
      },
      {
        code: "ar",
        dir: "rtl",
        name: "عربي",
        file: "ar.js",
      },
    ],
  },
  app: {
    
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: "موتيلز",
      htmlAttrs: {
        lang: "ar",
        dir: "rtl",
      },
      link: [
        {
          rel: "icon",
          type: "image/png",
          alt: "Moteelz",
          href: "https://moteelz.com/img/icon_motelz.png",
        },
      ],
      script: [],
    },
  },
  
  head: {
    script: [
      {
        src: "https://cdn.moyasar.com/js/v2/moyasar.min.js",
        type: "text/javascript",
        defer: true,
      },
    ],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  swiper: {
    // Swiper options
    //----------------------
    // prefix: 'Swiper',
    // styleLang: 'css',
    // modules: ['navigation', 'pagination'], // all modules are imported by default
  },

  googleFonts: {
    families: {
      "El+Messiri": true,
    },
  },

  image: {
    // Options
  },

  css: [
    "@/assets/css/tailwind.css",
    "@/assets/sass/app.scss",
    "nprogress/nprogress.css",
  ],
  runtimeConfig: {
    // Public keys that are exposed to the client
    apiKey: process.env.NUXT_API_KEY,

    // Public keys that are exposed to the client
    public: {
      apiUrl: process.env.NUXT_API_URL,
      MOYASSAR_API_KEY: process.env.MOYASSAR_API_KEY,
    },
  },
});
