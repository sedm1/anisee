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
      Backend: 'http://anisee-nuxt:81/server',
      AnimeApi: 'https://api.anilibria.tv/v3',
      AnimeStaticApi: 'https://static-libria.weekstorm.one',
      AnimePostersApi: 'https://static-libria.weekstorm.one/'
    }
  },
  routeRules: {
    '/anime': {ssr: false},
    '/anime/**': {ssr: false},
    '/favorites':{ssr: false},
  }
})
