export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    css: {
        preprocessorOptions: {
            sass: {
                additionalData: '@import "@/assets/sass/main.sass"',
            },
        },
    },
  },
  modules: [
    '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {
    public: {
      Backend: 'http://anisee-nuxt:81/server/backend/',
      AnimeApi: 'https://api.anilibria.tv/v3/'
    }
  },
  routeRules: {
    '/anime/**': { ssr: false },
  }
})
