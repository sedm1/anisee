// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  vite: {
    css: {
        preprocessorOptions: {
            sass: {
                additionalData: '@import "@/assets/sass/main.sass"',
            },
        },
    },
  },
  runtimeConfig: {
    public: {
      AnimeApi: 'https://api.anilibria.tv/v3',
      AnimeStaticApi: 'https://static-libria.weekstorm.one'
    }
  }
})