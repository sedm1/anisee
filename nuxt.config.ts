// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/test-utils/module',
    'nuxt-swiper',
    '@vite-pwa/nuxt'
  ],
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
  },
  pwa: {
    manifest: {
      name: 'AniSee',
      short_name: 'Anisee',
      description: 'Платформа для просмотра аниме',
      display: 'fullscreen',
      orientation: 'landscape-secondary',
      theme_color: '#3e90f0',
      background_color: '#0a0c0c',
      id: '/',
      screenshots: [
        {
          src: '/screenshots/pc.png',
          sizes: "1904x912",
          type: "image/png",
          form_factor: "wide",
          label: "Скриншот главного экрана"
        }, 
        {
          src: '/screenshots/mobile.png',
          sizes: "517x910",
          type: "image/png",
          form_factor: "narrow",
          label: "Скриншот главного экрана"
        }
      ],
      icons: [
		    {
          src: "/icons/icon-36x36.png",
          sizes: "36x36",
          type: "image/png"
        },
        {
          src: "/icons/icon-48x48.png",
          sizes: "48x48",
          type: "image/png"
        },
        {
          src: "/icons/icon-72x72.png",
          sizes: "72x72",
          type: "image/png"
        },
        {
          src: "/icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png"
        },
        {
          src: "/icons/icon-128x128.png",
          sizes: "128x128",
          type: "image/png"
        },
        {
          src: "/icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png"
        
        },
        {
          src: "/icons/icon-152x152.png",
          sizes: "152x152",
          type: "image/png"
        },
        {
          src: "/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icons/icon-384x384.png",
          sizes: "384x384",
          type: "image/png"
        },
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
    ]
    },
    workbox: {
      navigateFallback: '/'
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})