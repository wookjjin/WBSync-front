// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  devtools: { enabled: false },
  css: ['~/styles/main.css'],
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  compatibilityDate: '2024-11-01',
  eslint: {
    // options
  }
})
