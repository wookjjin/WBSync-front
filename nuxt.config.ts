// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  typescript: {
    typeCheck: true
  },
  devtools: { enabled: false },
  css: ['~/styles/main.css'],
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  compatibilityDate: '2024-11-01',
  eslint: {
    // options
  },
  unocss: {
    nuxtLayers: true
  }
})
