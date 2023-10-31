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
      googleSheetsId: '1b-FEDXioYI81GsRpE4HPyF5EC5R2pChdPdESp-SqRXM',
      googleSheetsGid: '0',
    },
  },
})
