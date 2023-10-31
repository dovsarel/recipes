// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      googleSheetsId: '1FxAn1aH9KcQ9Kvk2MpucO-Z0ZLawqj1gCF57hC7D2ns',
      googleSheetsGid: '0',
    },
  },
})
